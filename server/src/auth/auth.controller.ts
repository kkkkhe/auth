import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response';
import { ZodValidationPipe } from 'nestjs-zod';
import { TokenService } from '../token/token.service';
import { AuthGuard } from './auth.guard';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
const jwt = require('jsonwebtoken')

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Get('refresh')
  @UseGuards(AuthGuard)
  async refresh(@Req() req: Request, @Session() session) {
    const { refresh_token } = session;
    const data = await this.tokenService.refresh(refresh_token);
    session.refresh_token = this.tokenService.generateTokens(data.user);
    return {
      data,
    };
  }

  @Post('signup')
  @UsePipes(ZodValidationPipe)
  async signup(
    @Body() userCredentials: SignupCredentialsDto,
    @Session() session,
  ) {
    const data = await this.authService.signup(userCredentials);
    session.refresh_token = data.refresh_token;
    console.log(data)
    return AuthResponseDto.create(data);

    // return {
    //   id: 1,
    //   name: 'Denis',
    //   email: 'aiosdjfoasdf@gmil.com',
    //   access_token: 'pwjij23ioj4023i23jmojfdios0f',
    // };
  }
  @Post('signin')
  @UsePipes(ZodValidationPipe)
  async signin(@Body() userCredentials: SigninCredentialsDto, @Session() session) {
    const data = await this.authService.signin(userCredentials);
    session.refresh_token = data.refresh_token;
    const token = data.refresh_token
    const b = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbmlzIiwiZW1haWwiOiJkZW56ZWwyLmRlbmlzQGdtYWlsLmNvbSIsImlhdCI6MTY4MjY0NDE4MCwiZXhwIjoxNjgzOTQwMTgwfQ.oWzLFU3Ph1QPYhOR50UDh9VrwNe0kQDNBLpfKHYeNf8"
    const a = jwt.verify(b, "2]>j@rlEq@aGnA/#0&[ZCKq_)q?;~pkT0JL92k|82%GBLxH@`6{CGZ=8Q1GTO")
    return AuthResponseDto.create(data);
  }
}
