import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify, decode } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
@Injectable()
export class TokenService {
  constructor(private userService: UserService) {}
  generateTokens(data: any) {
    const access_token = sign(data, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refresh_token = sign(data, process.env.REFRESH_SECRET, {
      expiresIn: '15d',
    });

    return {
      access_token,
      refresh_token,
    };
  }
  async refresh(token: string) {
    if (!token) {
      throw new UnauthorizedException('There is no refresh token');
    }
    const userDto = this.verifyRefreshToken(token);
    if (!userDto) {
      throw new UnauthorizedException('User is not authorized');
    }
    const user = await this.userService.findOne({ id: userDto.id });
    const { access_token, refresh_token } = this.generateTokens(user);
    return {
      user,
      access_token,
      refresh_token,
    }
  }
  verifyAccessToken(token: string): UserDto {
    const data = verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        throw new UnauthorizedException()
      }
      return decoded
    });
    if (data) {
      return UserDto.create(data);
    }
    return null
  }
  verifyRefreshToken(token: string) {
    const data = verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
      if(err){
        throw new UnauthorizedException()
      }
      return decoded
    });
    if (data) {
      return UserDto.create(data);
    }
    return null;
  }
}
