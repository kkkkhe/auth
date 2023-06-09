import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
const AuthResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  }),
  access_token: z.string(),
});

export class AuthResponseDto extends createZodDto(AuthResponseSchema) {}
