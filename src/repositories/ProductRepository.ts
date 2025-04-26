import { UUID } from "crypto";
import { IProduct } from "../models/Product";
import ProductRequestDTO from "../dto/ProductRequestDTO";

export default interface ProductRepository {
  findAll(): Promise<IProduct[]>;
  findByPK(pk: UUID): Promise<IProduct>;
  findByName(name: string): Promise<IProduct[]>;
    create(product: ProductRequestDTO): Promise<IProduct>;
  //   findByEmail(email: string): Promise<IUser>;
  //   ensureEmailIsAvailable(email: string): Promise<boolean>;
  //   deleteByPK(pk: UUID): Promise<void>;
  //   ensureUserExists(pk: UUID): Promise<void>;
  //   updateByPK(pk: UUID, updates: Partial<UserRequestDTO>): Promise<IUser>;
}
