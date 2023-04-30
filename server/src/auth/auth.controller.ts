import {
  Body,
  Controller,
  Post,
  Req,
  Session,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response';
import { ZodValidationPipe } from 'nestjs-zod';
import { TokenService } from '../token/token.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}
  @Post('signup')
  @UsePipes(ZodValidationPipe)
  async signup(
    @Body() userCredentials: SignupCredentialsDto,
    @Session() session,
  ) {
    const data = await this.authService.signup(userCredentials);
    session.refresh_token = data.refresh_token;
    return AuthResponseDto.create(data);
  }
  @Post('signin')
  @UsePipes(ZodValidationPipe)
  async signin(@Body() userCredentials: SigninCredentialsDto, @Req() req: Request) {
    const data = await this.authService.signin(userCredentials);
    req.session['refresh_token'] = data.refresh_token
    return AuthResponseDto.create(data);
  }
}
