import { z } from 'zod';

const REQUIRED_MSG = 'Some required fields are missing';

const RegisterSchema = z.object({
  name: z
    .string({ required_error: REQUIRED_MSG })
    .min(2, 'Name must be at least 2 characters'),
  email: z.string({ required_error: REQUIRED_MSG }).email('Invalid email'),
  password: z
    .string({ required_error: REQUIRED_MSG })
    .min(4, 'Password must be at least 4 characters'),
});

export default RegisterSchema;
