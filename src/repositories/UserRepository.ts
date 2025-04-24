import { UUID } from "crypto";
import { IUser } from "../models/User";

export default interface UserRepository {
  findByPK(pk: UUID): Promise<IUser | null>;
}
