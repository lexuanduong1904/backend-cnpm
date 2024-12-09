import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './model/images.model';
import { Tour } from '../tours/model/tours.model';

@Module({
  imports: [SequelizeModule.forFeature([Image, Tour])],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
