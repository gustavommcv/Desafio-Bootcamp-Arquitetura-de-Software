import User from "../models/User";

export default interface AuthService {
  login(email: string, password: string): Promise<User>;
  register(name: string, email: string, password: string): Promise<User>;
}
