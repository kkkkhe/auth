import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaConfig/prisma.service';
import { UserService } from '../user/user.service';
import { UserCredentialDto } from './dto/dto';
import { sign } from 'jsonwebtoken';
import { hashPassword } from '../../utils/hash-password';
import {TokenService} from "../token/token.service";
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  async signup(userCredentials: UserCredentialDto) {
    const candidate = await this.userService.findOne({
      email: userCredentials.email,
    });
    if (candidate) {
      throw new ConflictException('Such email is already used');
    }

    const hash = await hashPassword(userCredentials.password);

    const user = await this.userService.create({
      name: userCredentials.name,
      email: userCredentials.email,
      hash,
    });
    const { access_token, refresh_token } = this.tokenService.generateTokens({
      name: userCredentials.name,
      email: userCredentials.email,
    });
    return {
      user,
      access_token,
      refresh_token
    };
  }
}
