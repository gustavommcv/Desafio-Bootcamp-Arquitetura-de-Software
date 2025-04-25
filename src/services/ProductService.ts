import Product from "../models/Product";

export default interface ProductService {
  //   findUserById(id: UUID): Promise<UserResponseDTO>;
  findAllProducts(): Promise<Product[]>;
  //   updateUser(id: UUID, user: UserRequestDTO): Promise<UserResponseDTO>;
  //   deleteUser(id: UUID): Promise<void>;
}
