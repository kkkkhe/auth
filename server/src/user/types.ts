import { Prisma, user} from '@prisma/client';
export interface IUserService {
  create: (userData: Prisma.userCreateInput) => Promise<user>;
  findOne: (where: Prisma.userWhereInput) => Promise<user>
}

export interface User {
  name: string
  password: string
  email: string
}