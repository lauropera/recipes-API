import { Schema } from 'zod';
import HttpException from '../../../utils/HttpException';

export default function validator<T>(
  data: T,
  schema: Schema,
  statusCode: number,
): void {
  const parse = schema.safeParse(data);

  if (!parse.success) {
    const { message } = parse.error.issues[0];
    throw new HttpException(statusCode, message);
  }
}
