import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
const UserSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(20, { message: 'Must be 20 or less characters long' }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(30, { message: 'Must be 30 or less characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export class UserCredentialDto extends createZodDto(UserSchema) {}
