import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { ResponseMessage } from '@/decorator/customize';

@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutsService: CheckoutsService) {}

  @Post('/create-checkout')
  @ResponseMessage('Create checkout success!')
  async create(@Body() createCheckoutDto: CreateCheckoutDto) {
    return await this.checkoutsService.create(createCheckoutDto);
  }

  @Get('/list-checkouts')
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return await this.checkoutsService.findAll(current, pageSize, filter, sort);
  }

  @Get()
  async findOne(@Query('id') id: string) {
    return await this.checkoutsService.findOne(id);
  }
}
