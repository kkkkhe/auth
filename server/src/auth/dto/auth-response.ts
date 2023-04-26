import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
const AuthResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z
      .string()
      .min(2, { message: 'Must be 2 or more characters long' })
      .max(20, { message: 'Must be 20 or less characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
  }),
  access_token: z.string(),
});

export class AuthResponseDto extends createZodDto(AuthResponseSchema) {}
