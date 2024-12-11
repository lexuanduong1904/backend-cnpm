import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Checkout } from './model/checkouts.model';
import { Booking } from '../bookings/model/bookings.model';

@Module({
  imports: [SequelizeModule.forFeature([Checkout, Booking])],
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  exports: [CheckoutsService],
})
export class CheckoutsModule {}
