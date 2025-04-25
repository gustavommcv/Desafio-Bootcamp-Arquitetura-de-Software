import { UUID } from "crypto";
import UserResponseDTO from "../dto/UserResponseDTO";
import UserRequestDTO from "../dto/UserRequestDTO";

export default interface UserService {
  findUserById(id: UUID): Promise<UserResponseDTO>;
  findAllUsers(): Promise<UserResponseDTO[]>;
  updateUser(id: UUID, user: UserRequestDTO): Promise<UserResponseDTO>;
  deleteUser(id: UUID): Promise<void>;
}
