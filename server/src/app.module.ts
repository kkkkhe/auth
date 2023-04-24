import { Module } from '@nestjs/common';
import { PrismaService } from './prismaConfig/prisma.service';
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
