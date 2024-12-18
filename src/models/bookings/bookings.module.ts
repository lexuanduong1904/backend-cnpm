import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './model/bookings.model';
import { User } from '../users/model/users.model';
import { Tour } from '../tours/model/tours.model';
import { Review } from '../reviews/model/reviews.model';
import { Checkout } from '../checkouts/model/checkouts.model';
import { BookingGuests } from '../booking-guests/model/booking-guests.model';
import { Invoice } from '../invoices/model/invoices.model';
import { ToursModule } from '../tours/tours.module';
import { BookingGuestsModule } from '../booking-guests/booking-guests.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Booking,
      User,
      Tour,
      Review,
      Checkout,
      BookingGuests,
      Invoice,
    ]),
    ToursModule,
    BookingGuestsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
