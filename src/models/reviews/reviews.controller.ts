import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Public, ResponseMessage } from '@/decorator/customize';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/create-review')
  @Public()
  @ResponseMessage('Create review success!')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.create(createReviewDto);
  }

  @Get('/list-reviews')
  @Public()
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return await this.reviewsService.findAll(current, pageSize, filter, sort);
  }

  @Get()
  @Public()
  async findOne(@Query('id') id: string) {
    return await this.reviewsService.findOne(id);
  }

  @Put()
  @Public()
  @ResponseMessage('Update review success!')
  async update(@Query('id') id: string, updateReviewDto: UpdateReviewDto) {
    return await this.reviewsService.update(id, updateReviewDto);
  }

  @Delete()
  @Public()
  @ResponseMessage('Delete review success!')
  async delete(@Query('id') id: string) {
    return await this.reviewsService.delete(id);
  }
}
