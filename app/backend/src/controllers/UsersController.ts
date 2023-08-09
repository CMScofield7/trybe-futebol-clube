import { Request, Response } from 'express';
import UserService from '../services/UsersServices';

export default class UsersController {
  constructor(private _userService = new UserService()) {
    this.login = this.login.bind(this);
    this.getUserByRole = this.getUserByRole.bind(this);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this._userService.login(email, password);

    if (status !== 'SUCCESS') return res.status(401).send(data);

    return res.status(200).send(data);
  }

  public async getUserByRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.user;
    // console.log(req.body);
    const { status, data } = await this._userService.getUserByRole(email);

    if (status !== 'SUCCESS') return res.status(401).send(data);

    return res.status(200).send(data);
  }
}
