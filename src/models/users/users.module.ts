import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/users.model';
import { Booking } from '../bookings/model/bookings.model';
import { SupportRequest } from '../support-requests/model/support-requests.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Booking, SupportRequest])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
