import { JwtPayload } from 'jsonwebtoken';

export default interface ITokenPayload extends JwtPayload {
  data: {
    name: string;
    email: string;
  };
}
