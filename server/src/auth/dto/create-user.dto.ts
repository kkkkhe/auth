import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  hash: z.string(),
});

export class CreateUserDto extends createZodDto(UserSchema) {}
