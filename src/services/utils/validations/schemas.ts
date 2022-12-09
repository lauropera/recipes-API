import { z } from 'zod';

const REQUIRED_MSG = 'Some required fields are missing';

export const LoginSchema = z.object({
  email: z.string({ required_error: REQUIRED_MSG }).email('Invalid email'),
  password: z
    .string({ required_error: REQUIRED_MSG })
    .min(4, 'Password must be at least 4 characters'),
});

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string({ required_error: REQUIRED_MSG })
    .min(2, 'Name must be at least 2 characters'),
});
