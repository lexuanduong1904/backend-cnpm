import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './model/images.model';
import { Transaction } from 'sequelize';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image)
    private readonly imagesModel: typeof Image,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const image = this.imagesModel.build({
      ...createImageDto,
    });
    const newImage = await image.save();
    return await this.imagesModel.findByPk(newImage.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async findImageByTourId(tourId: string) {
    return await this.imagesModel.findAll({
      where: { tourId: tourId },
      attributes: {
        exclude: ['tourId'],
      },
    });
  }

  async createImages(
    images: { tourId: string; url: string; description: string }[],
    transaction?: Transaction,
  ) {
    return await this.imagesModel.bulkCreate(images, { transaction });
  }

  async updateImages(
    images: { tourId: string; url: string; description: string }[],
    transaction?: Transaction,
  ) {}
}
