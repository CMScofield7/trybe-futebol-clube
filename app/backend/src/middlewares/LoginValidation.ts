// import Joi = require('joi');
import { Request, Response, NextFunction } from 'express';

const responseMessage = 'All fields must be filled';
const invalidMessage = 'Invalid email or password';

export default class LoginValidation {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static passwordMin = 6;

  public static validEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: responseMessage });
    }

    if (!this.validEmail(email) || password.length < this.passwordMin) {
      return res.status(401).send({ message: invalidMessage });
    }

    next();
  }
}
