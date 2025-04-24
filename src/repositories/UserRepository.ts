import { UUID } from "crypto";
import { IUser } from "../models/User";

export default interface UserRepository {
  findByPK(pk: UUID): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser>;
}
