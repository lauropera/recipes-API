import { NextFunction, Request, Response } from 'express';
import Token from '../services/utils/token/TokenUtils';

async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers.authorization || '';

  res.locals.user = await Token.authenticate(token);

  next();
}

export default authMiddleware;
