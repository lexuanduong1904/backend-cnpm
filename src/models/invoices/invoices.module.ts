import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './model/invoices.model';
import { Booking } from '../bookings/model/bookings.model';

@Module({
  imports: [SequelizeModule.forFeature([Invoice, Booking])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
