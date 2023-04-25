import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
@Injectable()
export class TokenService {
  generateTokens(data: any) {
    const access_token = sign(...data, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const refresh_token = sign(...data, process.env.REFRESH_SECRET, {
      expiresIn: '15d',
    });
    return {
      access_token,
      refresh_token
    }
  }
}
