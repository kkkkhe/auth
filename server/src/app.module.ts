import { Module } from '@nestjs/common';
import { PrismaService } from './prismaConfig/prisma.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.modul';
import { TokenModule } from './token/token.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env' }),
    UserModule,
    AuthModule,
    TokenModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
