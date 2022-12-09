import 'dotenv';
import { sign, verify } from 'jsonwebtoken';

import HttpException from '../../../utils/HttpException';
import { IUser } from '../../../database/models/User';
import ITokenPayload from './types/ITokenPayload';

const SECRET = process.env.SECRET || 'jwt_secret';

class Token {
  static generate({ name, email, roleId }: IUser): string {
    return sign({ data: { name, email, roleId } }, SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  }

  static async authenticate(
    token: string | undefined,
  ): Promise<ITokenPayload | void> {
    if (!token) throw new HttpException(401, 'Token is missing');

    const bearerToken = token?.startsWith('Bearer ') ? token : `Bearer ${token}`;
    const tokenWithoutBearer = bearerToken.substring(7, bearerToken.length);

    try {
      const payload = verify(tokenWithoutBearer, SECRET);
      return payload as ITokenPayload;
    } catch (error) {
      throw new HttpException(400, 'Token is invalid');
    }
  }
}

export default Token;
