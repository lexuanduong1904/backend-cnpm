import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './model/invoices.model';
import { BookingsService } from '../bookings/bookings.service';
import { Sequelize } from 'sequelize-typescript';
import { BookingStatusEnum } from '@/types/enums/booking-status.enum';
import dayjs from 'dayjs';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice)
    private readonly invoicesModel: typeof Invoice,
    private readonly bookingsService: BookingsService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const currBooking = await this.bookingsService.findOne(
      createInvoiceDto.bookingId,
    );

    if (!currBooking || currBooking.status !== BookingStatusEnum.Confirmed)
      throw new BadRequestException(
        'Booking does not exist or has not been paid!',
      );

    const isExist = await this.invoicesModel.findOne({
      where: { bookingId: currBooking.id },
    });

    if (isExist) throw new BadRequestException('Invoice was created!');
    const now = dayjs();
    const transaction = await this.sequelize.transaction();
    try {
      const newInvoice = await this.invoicesModel.create({
        ...createInvoiceDto,
        dateIssued: now.format('YYYY-MM-DD HH:mm:ss'),
        amout: currBooking.totalPrice,
      });
      await transaction.commit();
      return await this.invoicesModel.findByPk(newInvoice.id);
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
    const data = await this.invoicesModel.findAndCountAll({
      where: where,
      distinct: true,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      raw: false,
      nest: true,
    });
    const invoices = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { invoices, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.invoicesModel.findByPk(id);
  }
}
