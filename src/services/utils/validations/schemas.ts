import { z } from 'zod';

const REQUIRED_MSG = 'Some required fields are missing';
const EMAIL_MSG = 'Invalid email';

const setLengthMessage = (field: string, lengthNumber: number) =>
  `${field} must have at least ${lengthNumber} characters`;

export const LoginSchema = z.object({
  email: z.string({ required_error: REQUIRED_MSG }).email(EMAIL_MSG),
  password: z
    .string({ required_error: REQUIRED_MSG })
    .min(4, setLengthMessage('Password', 4)),
});

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string({ required_error: REQUIRED_MSG })
    .min(2, setLengthMessage('Name', 2)),
});

export const RecipeSchema = z.object({
  name: z
    .string({ required_error: REQUIRED_MSG })
    .min(2, setLengthMessage('Recipe name', 2)),
  chef: z.string({ required_error: REQUIRED_MSG }).email(EMAIL_MSG),
  preparationTime: z
    .number({ required_error: REQUIRED_MSG })
    .positive('Invalid preparation time'),
  servings: z
    .number({ required_error: REQUIRED_MSG })
    .positive('Invalid serving quantity'),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string({ required_error: REQUIRED_MSG }),
  ingredients: z
    .array(
      z.object({
        amount: z.number().positive('Invalid amount'),
        name: z.string().min(2, setLengthMessage('Ingredient name', 2)),
        unit: z.string().optional(),
      }),
      { required_error: REQUIRED_MSG }
    )
    .nonempty(),
  instructions: z.array(z.string()).nonempty(),
});
