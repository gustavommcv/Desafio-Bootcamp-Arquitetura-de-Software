import { UUID } from "crypto";
import { IUser } from "../models/user";

export default interface userRepository {
  findByPK(pk: UUID): Promise<IUser | null>;
}
