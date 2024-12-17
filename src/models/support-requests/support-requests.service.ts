import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { UpdateSupportRequestDto } from './dto/update-support-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SupportRequest } from './model/support-requests.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SupportRequestsService {
  constructor(
    @InjectModel(SupportRequest)
    private readonly supportRequestsModel: typeof SupportRequest,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createSupportRequest: CreateSupportRequestDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const newRequest = await this.supportRequestsModel.create({
        ...createSupportRequest,
        readStatus: false,
      });
      transaction.commit();
      return await this.supportRequestsModel.findByPk(newRequest.id);
    } catch (error) {
      transaction.rollback();
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
    const data = await this.supportRequestsModel.findAndCountAll({
      where: where,
      distinct: true,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      raw: false,
      nest: true,
    });
    const supportRequests = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { supportRequests, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.supportRequestsModel.findByPk(id);
  }

  async update(id: string, updateSupportRequestDto: UpdateSupportRequestDto) {
    const currSupportRequest = await this.supportRequestsModel.findByPk(id);
    if (!currSupportRequest) throw new BadRequestException();
    const transaction = await this.sequelize.transaction();
    try {
      await this.supportRequestsModel.update(
        {
          ...updateSupportRequestDto,
        },
        {
          where: { id },
          transaction,
        },
      );
      await transaction.commit();
      return await this.supportRequestsModel.findByPk(id);
    } catch (error) {
      await transaction.rollback();
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    return await this.supportRequestsModel.destroy({
      where: { id },
    });
  }
}
