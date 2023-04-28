import {
  ConflictException,
  Injectable,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prismaConfig/prisma.service';
import { UserService } from '../user/user.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { comparePassword, hashPassword } from '../../utils/hash-password';
import { TokenService } from '../token/token.service';
import { UserDto } from '../user/dto/user.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}
  async signup(userCredentials: SignupCredentialsDto) {
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
    const { access_token, refresh_token } = this.tokenService.generateTokens(
      UserDto.create(user),
    );
    return {
      user,
      access_token,
      refresh_token,
    };
  }

  async signin(userCredentials: SigninCredentialsDto) {
    const user = await this.userService.findOne({
      email: userCredentials.email,
    });

    if (!user) {
      throw new NotFoundException('There is no user with such email!');
    }

    const comparedPassword = await comparePassword(
      userCredentials.password,
      user.hash,
    );
    if (!comparedPassword) {
      throw new UnauthorizedException('Invalid password')
    }

    const { access_token, refresh_token } = this.tokenService.generateTokens({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    return {
      user,
      access_token,
      refresh_token,
    };
  }
}
