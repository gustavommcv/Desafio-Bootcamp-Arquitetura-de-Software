export default class user {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: {
    id?: string;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || new Date();
  }
}
