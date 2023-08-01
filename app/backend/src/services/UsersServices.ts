import { ServiceResponse } from '../types/ServiceResponse';
import { IUser } from '../Interfaces/IUser';
import Users from '../database/models/UsersModel';
import Bcrypt from '../utils/Bcrypt';
import Jwt from '../utils/Jwt';

export default class UserService {
  constructor(
    private _users = Users,
    private _bcrypt = new Bcrypt(),
    private _jwt = new Jwt(),
  ) { }

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await this._users.findOne({ where: { email } });
    return user ? {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    } : null;
  }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const validPassword = await this._bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = this._jwt.sign(payload);
    return { status: 'SUCCESS', data: { token } };
  }
}