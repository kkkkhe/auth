import { Injectable } from '@nestjs/common';
import { IUserService } from './types';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from '../prismaConfig/prisma.service';

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}
  async create(userData: Prisma.userCreateInput): Promise<user> {
    const user = await this.prisma.user.create({
      data: userData,
    });
    return user;
  }

  async findOne(where: Prisma.userWhereUniqueInput): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where,
    });
    return user;
  }
}
