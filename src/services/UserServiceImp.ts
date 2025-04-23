import UserService from "./UserService";

export default class UserServiceImp implements UserService {
  getUsers(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
}
