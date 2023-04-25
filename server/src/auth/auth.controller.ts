import {Body, Controller, Post, Session} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/dto';
import { hashPassword } from '../../utils/hash-password';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(
    @Body() userCredentials: UserCredentialDto,
    @Session() session: any,
  ) {
    // session.visits = session.visits ? session.visits + 1 : 1;

    return this.authService.signup(userCredentials);
  }
}
