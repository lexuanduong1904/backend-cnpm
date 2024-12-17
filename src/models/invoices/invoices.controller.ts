import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Public, ResponseMessage } from '@/decorator/customize';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Public()
  @ResponseMessage('Create invoice success!')
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return await this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @Public()
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return await this.invoicesService.findAll(current, pageSize, filter, sort);
  }

  @Get()
  @Public()
  async findOne(@Query('id') id: string) {
    return await this.invoicesService.findOne(id);
  }
}
