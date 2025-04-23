import { UUID } from "crypto";
import user from "../models/user";

export default interface userService {
  findUserById(id: UUID): Promise<user>;
}
