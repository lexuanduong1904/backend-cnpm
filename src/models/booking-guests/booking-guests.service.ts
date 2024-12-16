import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { BookingGuests } from './model/booking-guests.model';

@Injectable()
export class BookingGuestsService {
  constructor(
    @InjectModel(BookingGuests)
    private readonly bookingGuestsModel: typeof BookingGuests,
  ) {}

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
