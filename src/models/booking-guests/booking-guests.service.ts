import { Injectable } from '@nestjs/common';
import { CreateBookingGuestDto } from './dto/create-booking-guest.dto';
import { UpdateBookingGuestDto } from './dto/update-booking-guest.dto';

@Injectable()
export class BookingGuestsService {
  create(createBookingGuestDto: CreateBookingGuestDto) {
    return 'This action adds a new bookingGuest';
  }

  findAll() {
    return `This action returns all bookingGuests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingGuest`;
  }

  update(id: number, updateBookingGuestDto: UpdateBookingGuestDto) {
    return `This action updates a #${id} bookingGuest`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingGuest`;
  }
}
