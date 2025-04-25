import { UUID } from "crypto";
import Product from "../models/Product";

export default interface ProductService {
  findProductById(id: UUID): Promise<Product>;
  findAllProducts(): Promise<Product[]>;
  //   updateUser(id: UUID, user: UserRequestDTO): Promise<UserResponseDTO>;
  //   deleteUser(id: UUID): Promise<void>;
}
