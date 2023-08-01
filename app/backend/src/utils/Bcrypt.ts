import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  private bcrypt = bcrypt;

  async encrypt(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(password, 10);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const validPassword = await this.bcrypt.compare(password, hash);
    return validPassword;
  }
}
