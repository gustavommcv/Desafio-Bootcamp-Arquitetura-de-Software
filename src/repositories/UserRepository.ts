import { UUID } from "crypto";
import { IUser } from "../models/User";
import UserRequestDTO from "../dto/UserRequestDTO";

export default interface UserRepository {
  findByPK(pk: UUID): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser>;
  create(user: UserRequestDTO): Promise<IUser>;
  ensureEmailIsAvailable(email: string): Promise<boolean>;
  deleteByPK(pk: UUID): Promise<void>;
  ensureUserExists(pk: UUID): Promise<void>;
  updateByPK(pk: UUID, updates: Partial<UserRequestDTO>): Promise<IUser>;
  findByName(name: string): Promise<IUser[]>;
}
