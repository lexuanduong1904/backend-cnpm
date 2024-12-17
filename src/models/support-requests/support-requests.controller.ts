import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { SupportRequestsService } from './support-requests.service';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { UpdateSupportRequestDto } from './dto/update-support-request.dto';
import { Public, ResponseMessage } from '@/decorator/customize';

@Controller('support-requests')
export class SupportRequestsController {
  constructor(
    private readonly supportRequestsService: SupportRequestsService,
  ) {}

  @Post('/create-support-request')
  @Public()
  @ResponseMessage('Create support request success!')
  async create(@Body() createSupportRequestDto: CreateSupportRequestDto) {
    return await this.supportRequestsService.create(createSupportRequestDto);
  }

  @Get('/list-support-requests')
  @Public()
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return await this.supportRequestsService.findAll(
      current,
      pageSize,
      filter,
      sort,
    );
  }

  @Get()
  @Public()
  async findOne(@Query('id') id: string) {
    return await this.supportRequestsService.findOne(id);
  }

  @Put()
  @Public()
  @ResponseMessage('Update support request success!')
  async update(
    @Query('id') id: string,
    updateSupportRequest: UpdateSupportRequestDto,
  ) {
    return await this.supportRequestsService.update(id, updateSupportRequest);
  }

  @Delete()
  @Public()
  @ResponseMessage('Delete support request success!')
  async delete(@Query('id') id: string) {
    return await this.supportRequestsService.delete(id);
  }
}
