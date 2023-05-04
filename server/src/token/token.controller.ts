import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { Request } from 'express';
import { RefreshDto } from './dto/refresh.dto';
@Controller('')
export class TokenController {
  constructor(private tokenService: TokenService) {}
  @Get('refresh')
  async refresh(@Session() session, @Req() req: Request) {
    const { refresh_token } = session;
    const data = await this.tokenService.refresh(refresh_token);
    return RefreshDto.create(data);
  }
}
