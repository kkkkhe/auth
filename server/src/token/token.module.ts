import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { TokenController } from './token.controller';

@Module({
  imports: [UserModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
