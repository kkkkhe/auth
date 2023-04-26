import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credentials.dto';
import { AuthResponseDto } from './dto/auth-response';
import { ZodValidationPipe } from 'nestjs-zod';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Get('refresh')
  async refresh(@Session() session) {
    const { refresh_token } = session;
    const data = await this.tokenService.refresh(refresh_token);
    session.refresh_token = this.tokenService.generateTokens(data.user);
    return {
      data,
    };
  }

  @Post('signup')
  @UsePipes(ZodValidationPipe)
  async signup(@Body() userCredentials: UserCredentialDto, @Session() session) {
    const data = await this.authService.signup(userCredentials);
    session.refresh_token = data.refresh_token;
    return AuthResponseDto.create(data);
  }
  @Post('signin')
  @UsePipes(ZodValidationPipe)
  async signin(@Body() userCredentials: UserCredentialDto, @Session() session) {
    const data = await this.authService.signin(userCredentials);
    session.refresh_token = data.refresh_token;
    return AuthResponseDto.create(data);
  }
}
