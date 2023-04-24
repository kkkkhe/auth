import { Module } from '@nestjs/common';
import { PrismaService } from '../prismaConfig/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [PrismaService, UserService],
})
export class UserModule {}
