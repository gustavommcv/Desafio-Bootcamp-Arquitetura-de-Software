import { UUID } from "crypto";
import user from "../models/User";

export default interface UserService {
  findUserById(id: UUID): Promise<user>;
}
