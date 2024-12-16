import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Checkout } from './model/checkouts.model';
import { BookingsService } from '../bookings/bookings.service';
import { Sequelize } from 'sequelize-typescript';
import dayjs from 'dayjs';
import { BookingStatusEnum } from '@/types/enums/booking-status.enum';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectModel(Checkout)
    private readonly checkoutsModel: typeof Checkout,
    private readonly bookingService: BookingsService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const transaction = await this.sequelize.transaction();
    const currBooking = await this.bookingService.findOne(
      createCheckoutDto.bookingId,
    );
    const now = dayjs();
    if (!currBooking)
      throw new BadRequestException('This booking is not found!');
    try {
      const newCheckout = await this.checkoutsModel.create(
        {
          ...createCheckoutDto,
          paymentDate: now.format('YYYY-MM-DD HH:mm:ss'),
          amount: currBooking.totalPrice,
        },
        {
          transaction,
        },
      );
      if (newCheckout)
        await this.bookingService.changeStatus(
          currBooking.id,
          BookingStatusEnum.Confirmed,
          transaction,
        );
      await transaction.commit();
      return await this.checkoutsModel.findByPk(newCheckout.id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw new BadRequestException(error);
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
    const data = await this.checkoutsModel.findAndCountAll({
      where: where,
      distinct: true,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      raw: false,
      nest: true,
    });
    const checkouts = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { checkouts, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.checkoutsModel.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }
}
