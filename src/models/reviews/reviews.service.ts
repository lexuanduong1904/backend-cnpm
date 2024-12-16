import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './model/reviews.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewsModel: typeof Review,
    private readonly sequelize: Sequelize,
  ) {}

  async findReviewByBookingId(bookingId: string) {
    return await this.reviewsModel.findOne({
      where: { bookingId: bookingId },
    });
  }

  async create(createReviewDto: CreateReviewDto) {
    const transaction = await this.sequelize.transaction();
    if (await this.findReviewByBookingId(createReviewDto.bookingId))
      throw new BadRequestException('Review of this booking is exist!');

    try {
      const newReview = await this.reviewsModel.create({
        ...createReviewDto,
      });
      return await this.reviewsModel.findByPk(newReview.id);
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
    const data = await this.reviewsModel.findAndCountAll({
      where: where,
      distinct: true,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      raw: false,
      nest: true,
    });
    const reviews = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { reviews, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.reviewsModel.findByPk(id);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.reviewsModel.update(
        {
          ...updateReviewDto,
        },
        {
          where: { id },
          transaction,
        },
      );
      transaction.commit();
      return await this.reviewsModel.findByPk(id);
    } catch (error) {
      transaction.rollback();
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    return await this.reviewsModel.destroy({
      where: { id },
    });
  }
}
