import { IProduct } from "../models/Product";

export default interface ProductRepository {
  findAll(): Promise<IProduct[]>;
  //   findByPK(pk: UUID): Promise<IUser>;
  //   findByEmail(email: string): Promise<IUser>;
  //   create(user: UserRequestDTO): Promise<IUser>;
  //   ensureEmailIsAvailable(email: string): Promise<boolean>;
  //   deleteByPK(pk: UUID): Promise<void>;
  //   ensureUserExists(pk: UUID): Promise<void>;
  //   updateByPK(pk: UUID, updates: Partial<UserRequestDTO>): Promise<IUser>;
}
