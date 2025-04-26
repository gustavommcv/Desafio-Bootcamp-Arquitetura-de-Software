import { UUID } from "crypto";
import Product from "../models/Product";
import ProductRequestDTO from "../dto/ProductRequestDTO";

export default interface ProductService {
  findProductById(id: UUID): Promise<Product>;
  findAllProducts(): Promise<Product[]>;
  findProductsByName(name: string): Promise<Product[]>;
  createProduct(product: ProductRequestDTO): Promise<Product>;
  deleteProduct(id: UUID): Promise<void>;
  //   updateUser(id: UUID, user: UserRequestDTO): Promise<UserResponseDTO>;
}
