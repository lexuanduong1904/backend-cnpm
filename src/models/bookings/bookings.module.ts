import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './model/bookings.model';
import { User } from '../users/model/users.model';
import { Tour } from '../tours/model/tours.model';
import { Review } from '../reviews/model/reviews.model';
import { Checkout } from '../checkouts/model/checkouts.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking, User, Tour, Review, Checkout]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
