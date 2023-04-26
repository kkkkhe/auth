import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
