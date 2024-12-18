import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ResponseMessage } from '@/decorator/customize';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/create-booking')
  @ResponseMessage('Create booking success!')
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingsService.create(createBookingDto);
  }

  //admin
  @Get('list-bookings')
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return await this.bookingsService.findAll(current, pageSize, filter, sort);
  }

  //user + admin
  @Get()
  @ResponseMessage('Take infomation of booking success!')
  async findOne(@Query('id') id: string) {
    return await this.bookingsService.findOne(id);
  }

  //user+admin
  @Put()
  @ResponseMessage('Update information of booking success!')
  async update(
    @Query('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return await this.bookingsService.update(id, updateBookingDto);
  }

  //admin
  @Delete()
  @ResponseMessage('Delete booking success!')
  async remove(@Query('id') id: string) {
    return id;
  }
}
