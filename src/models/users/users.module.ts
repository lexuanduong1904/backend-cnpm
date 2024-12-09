import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/users.model';
import { Booking } from '../bookings/model/bookings.model';
import { Review } from '../reviews/model/reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Booking, Review])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
