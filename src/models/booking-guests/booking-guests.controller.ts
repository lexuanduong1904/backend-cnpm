import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingGuestsService } from './booking-guests.service';
import { CreateBookingGuestDto } from './dto/create-booking-guest.dto';
import { UpdateBookingGuestDto } from './dto/update-booking-guest.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingGuestDto: UpdateBookingGuestDto) {
    return this.bookingGuestsService.update(+id, updateBookingGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingGuestsService.remove(+id);
  }
}
