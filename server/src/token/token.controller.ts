import { Controller, Get, Session } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('')
class TokenController {
  constructor(private tokenService: TokenService) {}
  @Get('refresh')
  async refresh(@Session() session) {
    const { refresh_token } = session;
    const data = await this.tokenService.refresh(refresh_token);
    session.refresh_token = this.tokenService.generateTokens(data.user);
    return {
      data,
    };
  }
}
