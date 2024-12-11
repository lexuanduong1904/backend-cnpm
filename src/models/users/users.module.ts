import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/users.model';
import { Booking } from '../bookings/model/bookings.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Booking])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
