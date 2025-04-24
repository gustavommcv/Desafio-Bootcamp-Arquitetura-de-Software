import { UUID } from "crypto";
import User from "../models/User";

export default interface UserService {
  findUserById(id: UUID): Promise<User>;
  findAllUsers(): Promise<User[]>;
}
