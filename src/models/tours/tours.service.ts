import { Sequelize } from 'sequelize-typescript';
import { ImagesService } from './../images/images.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tour } from './model/tours.model';
import moment, { Moment } from 'moment';
import { Image } from '../images/model/images.model';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour)
    private readonly toursModel: typeof Tour,
    private readonly imagesService: ImagesService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createTourDto: CreateTourDto) {
    const images = createTourDto.images;
    const seenUrls = new Set<string>();
    const duplicateUrls = new Set<string>();

    images.map((img) => {
      if (seenUrls.has(img.imageUrl)) {
        duplicateUrls.add(img.imageUrl);
      }
      seenUrls.add(img.imageUrl);
    });

    if (duplicateUrls.size > 0) {
      throw new BadRequestException(
        `Duplicate URLs found: ${Array.from(duplicateUrls).join(', ')}`,
      );
    }
    delete createTourDto.images;
    const transaction = await this.sequelize.transaction();
    try {
      const startDate = moment(createTourDto.startDate, 'DD/MM/YYYY');
      const endDate = moment(createTourDto.endDate, 'DD/MM/YYYY');
      if (startDate.isAfter(endDate))
        throw new BadRequestException('Start date must be before end date!');
      const tour = await this.toursModel.create(
        {
          title: createTourDto.title,
          description: createTourDto.description,
          destination: createTourDto.destination,
          startLocation: createTourDto.startLocation,
          transportation: createTourDto.transportation,
          quantity: createTourDto.quantity,
          price: createTourDto.price,
          startDate,
          endDate,
        },
        { transaction },
      );
      const imagesWithTourId = images.map((image) => {
        return {
          ...image,
          tourId: tour.id,
        };
      });
      await this.imagesService.createImages(imagesWithTourId, transaction);
      await transaction.commit();
      return tour;
    } catch (e) {
      await transaction.rollback();
      throw new Error(`Errpr: ${e}`);
    }
  }

  async findAll(
    current: string,
    pageSize: string,
    filter: string,
    sort: string,
  ) {
    const page = +pageSize || 10;
    const order = sort
      ? [sort.replace('-', ''), sort.startsWith('-') ? 'DESC' : 'ASC']
      : ['createdAt', 'DESC'];
    const offset = ((parseInt(current, 10) || 1) - 1) * page; // Tính offset
    const where = filter ? { ...JSON.parse(filter) } : {}; // Mặc định sort theo `createdAt`
    const data = await this.toursModel.findAndCountAll({
      where: where,
      distinct: true,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: {
            exclude: ['tourId'],
          },
        },
      ],
      raw: false,
      nest: true,
    });
    const tours = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { tours, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.toursModel.findByPk(id, {
      include: [
        {
          model: Image,
          as: 'images',
          attributes: {
            exclude: ['tourId'],
          },
        },
      ],
      raw: false,
      nest: true,
    });
  }

  async update(id: string, updateTourDto: UpdateTourDto) {
    const images = updateTourDto?.images;
    const transaction = await this.sequelize.transaction();
    delete updateTourDto.images;
    const currTour = await this.toursModel.findByPk(id);
    const newStartDate: Moment = updateTourDto?.startDate
      ? moment(updateTourDto.startDate, 'DD/MM/YYYY')
      : moment(currTour.startDate);
    const newEndDate: Moment = updateTourDto?.endDate
      ? moment(updateTourDto.endDate, 'DD/MM/YYYY')
      : moment(currTour.endDate);
    if (newStartDate.isAfter(newEndDate))
      throw new BadRequestException('Start date must be before end date!');
    delete updateTourDto.startDate;
    delete updateTourDto.endDate;
    try {
      // Handle update images
      if (images) {
        const seenUrls = new Set<string>();
        const duplicateUrls = new Set<string>();

        // Check list images
        images.map((img) => {
          if (seenUrls.has(img.imageUrl)) {
            duplicateUrls.add(img.imageUrl);
          }
          seenUrls.add(img.imageUrl);
        });

        // Check duplicate
        if (duplicateUrls.size > 0) {
          throw new BadRequestException(
            `Duplicate URLs found: ${Array.from(duplicateUrls).join(', ')}`,
          );
        }

        const imagesWithTourId = images.map((image) => {
          return {
            ...image,
            tourId: id,
          };
        });
        await this.imagesService.updateImages(
          id,
          imagesWithTourId,
          transaction,
        );
      }
      await this.toursModel.update(
        {
          ...updateTourDto,
          startDate: newStartDate,
          endDate: newEndDate,
        },
        {
          where: { id },
          transaction,
        },
      );
      transaction.commit();
      return await this.findOne(id);
    } catch (e) {
      transaction.rollback();
      throw new BadRequestException(e);
    }
  }

  async remove(id: string) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.imagesService.deleteImages(id, transaction);
      transaction.commit();
      return await this.toursModel.destroy({
        where: { id },
      });
    } catch (e) {
      transaction.rollback();
      throw new BadRequestException(e);
    }
  }
}
