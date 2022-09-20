import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { CookieAuthGuard } from './guard/cookie-auth.guard';
import { LoginWithCredentialsGuard } from './guard/login-with-creds.guard';
import { RequestUser } from './interface/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() regData: RegistrationDto) {
    return this.authService.register(regData);
  }

  @HttpCode(200)
  @UseGuards(LoginWithCredentialsGuard)
  @Post('login')
  async logIn(@Req() request: RequestUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Get()
  async authenticate(@Req() request: RequestUser) {
    return request.user;
  }

  @HttpCode(204)
  @UseGuards(CookieAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestUser) {
    request.session.destroy((err) => console.log(err));
  }
}
