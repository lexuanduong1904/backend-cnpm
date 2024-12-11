import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public, ResponseMessage } from '@/decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ResponseMessage('Fetch login')
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Request() req) {
    return await this.authService.handleLogin(req.user);
  }

  @Post('/register')
  @ResponseMessage('Regiter success!')
  @Public()
  async handleRegister(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.handleRegister(createAuthDto);
  }

  @Post('/change-password')
  @Public()
  @ResponseMessage('Change password success!')
  async handleChangePassword(
    @Query('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.handleChangePassword(id, changePasswordDto);
  }
}
