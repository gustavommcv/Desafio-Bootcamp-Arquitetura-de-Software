export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export default class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: Date = new Date(),
    public updated_at: Date = new Date()
  ) {}
}
