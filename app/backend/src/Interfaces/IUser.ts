export interface IUserLogin {
  id: number,
  email: string,
  password: string,
}

export interface IUser extends IUserLogin {
  username: string,
  role: string,
}
