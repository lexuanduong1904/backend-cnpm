import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Public } from '@/decorator/customize';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post('/create-tour')
  @Public()
  async create(@Body() createTourDto: CreateTourDto) {
    // console.log(createTourDto.images);
    return await this.toursService.create(createTourDto);
  }

  @Get('/list-tours')
  @Public()
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return this.toursService.findAll(current, pageSize, filter, sort);
  }

  @Get()
  async findOne(@Query('id') id: string) {
    return await this.toursService.findOne(id);
  }

  @Put()
  async update(@Query('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
