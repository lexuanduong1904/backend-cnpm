import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './model/reviews.model';
import { User } from '../users/model/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Review, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
