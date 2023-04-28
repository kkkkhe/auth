import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
const SigninShema = z.object({
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(30, { message: 'Must be 30 or less characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export class SigninCredentialsDto extends createZodDto(SigninShema) {}
