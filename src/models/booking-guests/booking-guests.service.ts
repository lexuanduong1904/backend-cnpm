import { Injectable } from '@nestjs/common';
import { CreateBookingGuestDto } from './dto/create-booking-guest.dto';
import { UpdateBookingGuestDto } from './dto/update-booking-guest.dto';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { BookingGuests } from './model/booking-guests.model';

@Injectable()
export class BookingGuestsService {
  constructor(
    @InjectModel(BookingGuests)
    private readonly bookingGuestsModel: typeof BookingGuests,
  ) {}

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

  async createGuests(
    guests: {
      bookingId: string;
      guestName: string;
      guestPhoneNumber: string | null;
      guestEmail: string | null;
    }[],
    transaction: Transaction,
  ) {
    return await this.bookingGuestsModel.bulkCreate(guests, { transaction });
  }

  async deleteGuests(bookingId: string, transaction: Transaction) {
    return await this.bookingGuestsModel.destroy({
      where: { bookingId },
      transaction,
    });
  }
}
