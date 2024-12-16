import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Checkout } from './model/checkouts.model';
import { Booking } from '../bookings/model/bookings.model';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [SequelizeModule.forFeature([Checkout, Booking]), BookingsModule],
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  exports: [CheckoutsService],
})
export class CheckoutsModule {}
