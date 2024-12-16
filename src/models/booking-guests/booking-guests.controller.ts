import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookingGuestsService } from './booking-guests.service';
import { CreateBookingGuestDto } from './dto/create-booking-guest.dto';

@Controller('booking-guests')
export class BookingGuestsController {
  constructor(private readonly bookingGuestsService: BookingGuestsService) {}

  @Post()
  create(@Body() createBookingGuestDto: CreateBookingGuestDto) {
    return this.bookingGuestsService.create(createBookingGuestDto);
  }

  @Get()
  findAll() {
    return this.bookingGuestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingGuestsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingGuestsService.remove(+id);
  }
}
