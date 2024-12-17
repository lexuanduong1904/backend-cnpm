import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './model/invoices.model';
import { Booking } from '../bookings/model/bookings.model';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [SequelizeModule.forFeature([Invoice, Booking]), BookingsModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
