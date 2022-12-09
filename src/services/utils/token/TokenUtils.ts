import 'dotenv';
import { sign, verify } from 'jsonwebtoken';

import HttpException from '../../../utils/HttpException';
import { IUser } from '../../../database/models/User';
import ITokenPayload from './types/ITokenPayload';

const SECRET = process.env.SECRET || 'jwt_secret';

class Token {
  static generate({ id, name, email }: IUser): string {
    return sign({ data: { id, name, email } }, SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  }

  static async authenticate(
    authToken: string | undefined,
  ): Promise<ITokenPayload | void> {
    if (!authToken) throw new HttpException(401, 'Token is missing');

    const [, token] = authToken.split(' ');

    try {
      const payload = verify(token, SECRET);
      return payload as ITokenPayload;
    } catch (error) {
      throw new HttpException(400, 'Token is invalid');
    }
  }
}

export default Token;
