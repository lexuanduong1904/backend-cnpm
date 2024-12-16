import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookingGuestsService } from './booking-guests.service';
import { CreateBookingGuestDto } from './dto/create-booking-guest.dto';

@Controller('booking-guests')
export class BookingGuestsController {
  constructor(private readonly bookingGuestsService: BookingGuestsService) {}
}
