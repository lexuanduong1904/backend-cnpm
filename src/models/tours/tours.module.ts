import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tour } from './model/tours.model';
import { Booking } from '../bookings/model/bookings.model';
import { Image } from '../images/model/images.model';
import { Review } from '../reviews/model/reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([Tour, Booking, Image, Review])],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
