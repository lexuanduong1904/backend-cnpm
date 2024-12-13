import { Module } from '@nestjs/common';
import { SupportRequestsService } from './support-requests.service';
import { SupportRequestsController } from './support-requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupportRequest } from './model/support-requests.model';
import { User } from '../users/model/users.model';

@Module({
  imports: [SequelizeModule.forFeature([SupportRequest, User])],
  controllers: [SupportRequestsController],
  providers: [SupportRequestsService],
  exports: [SupportRequestsService],
})
export class SupportRequestsModule {}
