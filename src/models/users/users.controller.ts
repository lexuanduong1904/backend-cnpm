import { Controller, Get, Body, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //admin
  @Get('/list-users')
  async findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return await this.usersService.findAll(current, pageSize, filter, sort);
  }

  // user + admin
  @Get()
  async findOne(@Query('id') id: string) {
    return await this.usersService.findOne(id);
  }

  // user + admin
  @Put()
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  // admin
  @Delete()
  async remove(@Query('id') id: string) {
    return await this.usersService.remove(id);
  }
}
