import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './model/bookings.model';
import { BookingGuestsService } from '../booking-guests/booking-guests.service';
import { ToursService } from '../tours/tours.service';
import { Sequelize } from 'sequelize-typescript';
import dayjs from 'dayjs';
import { BookingGuests } from '../booking-guests/model/booking-guests.model';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking)
    private readonly bookingsModel: typeof Booking,
    private readonly bookingGuestsService: BookingGuestsService,
    private readonly toursService: ToursService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const guests = createBookingDto.guests;
    if (guests.length <= 0)
      throw new BadRequestException('List guests must have at least a guest!');
    delete createBookingDto.guests;
    const now = dayjs();
    const transaction = await this.sequelize.transaction();
    const tourBooking = await this.toursService.findOne(
      createBookingDto.tourId,
    );

    if (
      createBookingDto.ticketQuantity > tourBooking.quantity ||
      createBookingDto.ticketQuantity <= 0
    )
      throw new BadRequestException('Number of ticket is invalid!');

    try {
      const newBooking = await this.bookingsModel.create(
        {
          ...createBookingDto,
          totalPrice: createBookingDto.ticketQuantity * tourBooking.price,
          bookingDate: now.format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          transaction,
        },
      );
      const guestsWithBookingId = guests.map((guest) => {
        return {
          ...guest,
          bookingId: newBooking.id,
        };
      });
      await this.bookingGuestsService.createGuests(
        guestsWithBookingId,
        transaction,
      );
      await transaction.commit();
      return newBooking;
    } catch (e) {
      transaction.rollback();
      throw new BadRequestException(e);
    }
  }

  async findAll(
    current: string,
    pageSize: string,
    filter: string,
    sort: string,
  ) {
    const page = +pageSize || 10;
    const order = sort
      ? [sort.replace('-', ''), sort.startsWith('-') ? 'DESC' : 'ASC']
      : ['createdAt', 'DESC'];
    const offset = ((parseInt(current, 10) || 1) - 1) * page;
    const where = filter ? { ...JSON.parse(filter) } : {};
    const data = await this.bookingsModel.findAndCountAll({
      where: where,
      distinct: true,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      include: [
        {
          model: BookingGuests,
          attributes: {
            exclude: ['bookingId', 'createdAt', 'updatedAt'],
          },
        },
      ],
      raw: false,
      nest: true,
    });
    const bookings = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { bookings, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.bookingsModel.findByPk(id, {
      include: [
        {
          model: BookingGuests,
          attributes: {
            exclude: ['bookingId', 'createdAt', 'updatedAt'],
          },
        },
      ],
      raw: false,
      nest: true,
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const guests = updateBookingDto?.guests;
    const transaction = await this.sequelize.transaction();
    const currBooking = await this.bookingsModel.findByPk(id);
    const currTour = await this.toursService.findOne(currBooking.tourId);
    if (updateBookingDto.ticketQuantity) {
      if (
        updateBookingDto.ticketQuantity > currTour.quantity ||
        updateBookingDto.ticketQuantity <= 0
      )
        throw new BadRequestException('Number of ticket is invalid!');
    }
    try {
      if (guests && guests.length > 0) {
        await this.bookingGuestsService.deleteGuests(id, transaction);
        const newGuestsWithBookingId = guests.map((guest) => {
          return {
            ...guest,
            bookingId: id,
          };
        });
        await this.bookingGuestsService.createGuests(
          newGuestsWithBookingId,
          transaction,
        );
      }
      await this.bookingsModel.update(
        {
          ...updateBookingDto,
          ticketQuantity: updateBookingDto.ticketQuantity
            ? updateBookingDto.ticketQuantity
            : currBooking.ticketQuantity,
          totalPrice: updateBookingDto.ticketQuantity
            ? updateBookingDto.ticketQuantity * currTour.price
            : currBooking.totalPrice,
        },
        {
          where: { id },
          transaction,
        },
      );

      await transaction.commit();
      return await this.findOne(id);
    } catch (e) {
      transaction.rollback();
      throw new BadRequestException(e);
    }
  }

  async remove(id: string) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.bookingGuestsService.deleteGuests(id, transaction);
      transaction.commit();
      return await this.bookingsModel.destroy({
        where: { id },
      });
    } catch (e) {
      transaction.rollback();
      throw new BadRequestException(e);
    }
  }
}
