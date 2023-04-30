import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthResponseDto } from '../auth/dto/auth-response';
import { Request } from 'express';
@Controller('')
export class TokenController {
  constructor(private tokenService: TokenService) {}
  @Get('refresh')
  async refresh(@Session() session, @Req() req: Request) {
    const { refresh_token } = session;
    const data = await this.tokenService.refresh(refresh_token);
    session.refresh_token = data.refresh_token;
    return AuthResponseDto.create(data);
  }
}
