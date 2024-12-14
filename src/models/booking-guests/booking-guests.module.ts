import { Module } from '@nestjs/common';
import { BookingGuestsService } from './booking-guests.service';
import { BookingGuestsController } from './booking-guests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingGuests } from './model/booking-guests.model';
import { Booking } from '../bookings/model/bookings.model';

@Module({
  imports: [SequelizeModule.forFeature([BookingGuests, Booking])],
  controllers: [BookingGuestsController],
  providers: [BookingGuestsService],
  exports: [BookingGuestsService],
})
export class BookingGuestsModule {}
