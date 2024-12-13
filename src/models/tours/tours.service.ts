import { Sequelize } from 'sequelize-typescript';
import { ImagesService } from './../images/images.service';
import { Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tour } from './model/tours.model';
import { CreateImageDto } from '../images/dto/create-image.dto';
import moment from 'moment';
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
    delete createTourDto.images;
    const transaction = await this.sequelize.transaction();
    try {
      const startDate = moment(createTourDto.startDate, 'DD/MM/YYYY');
      const endDate = moment(createTourDto.endDate, 'DD/MM/YYYY');
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
    });
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
