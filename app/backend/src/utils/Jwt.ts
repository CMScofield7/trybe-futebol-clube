import * as jwt from 'jsonwebtoken';

export default class Jwt {
  private jwt = jwt;
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  public sign(payload: string | object | Buffer): string {
    const token = this.jwt.sign(payload, this.jwtSecret);
    return token;
  }

  public verify(token: string) {
    const decoded = this.jwt.verify(token, this.jwtSecret);
    return decoded;
  }
}
