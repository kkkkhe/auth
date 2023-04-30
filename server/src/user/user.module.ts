import { Module } from '@nestjs/common';
import { PrismaService } from '../prismaConfig/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, TokenService],
  exports: [PrismaService, UserService],
})
export class UserModule {}
