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

  async findImagesByTourId(tourId: string) {
    return await this.imagesModel.findAll({
      where: { tourId: tourId },
      attributes: {
        exclude: ['tourId'],
      },
    });
  }

  async createImages(
    images: { tourId: string; imageUrl: string; description: string }[],
    transaction?: Transaction,
  ) {
    return await this.imagesModel.bulkCreate(images, { transaction });
  }

  async updateImages(
    tourId: string,
    images: { tourId: string; imageUrl: string; description: string }[],
    transaction?: Transaction,
  ) {
    const currImages = await this.findImagesByTourId(tourId);
    const currUrls = currImages.map((image) => {
      return image.imageUrl;
    });
    const newUrls = images.map((image) => {
      return image.imageUrl;
    });
    const imagesToDelete = currImages.filter(
      (img) => !newUrls.includes(img.imageUrl),
    );
    console.log(imagesToDelete);

    if (imagesToDelete.length > 0) {
      await this.imagesModel.destroy({
        where: { id: imagesToDelete.map((img) => img.id) },
        transaction,
      });
    }

    for (const img of images) {
      if (currUrls.includes(img.imageUrl)) {
        await this.imagesModel.update(
          {
            description: img.description,
          },
          {
            where: {
              imageUrl: img.imageUrl,
              tourId: tourId,
            },
            transaction,
          },
        );
      } else {
        await this.imagesModel.create(img, { transaction });
      }
    }
  }

  async deleteImages(tourId: string, transaction?: Transaction) {
    return await this.imagesModel.destroy({
      where: { tourId },
      transaction,
    });
  }
}
