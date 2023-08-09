import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/Jwt';

export default class TokenValidation {
  static jwt = new Jwt();

  static validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ message: 'Token not found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Token must be a valid token' });

    try {
      const decoded = this.jwt.verify(token);
      req.body.user = decoded;

      next();
    } catch (error) {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }
  }
}
