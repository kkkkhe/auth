import { Module } from '@nestjs/common';
import { PrismaService } from './prismaConfig/prisma.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ envFilePath: './.env' }), UserModule],
  providers: [PrismaService],
})
export class AppModule {}
