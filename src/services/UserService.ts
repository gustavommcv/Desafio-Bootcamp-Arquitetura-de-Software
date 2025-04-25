import { UUID } from "crypto";
import UserResponseDTO from "../dto/UserResponseDTO";

export default interface UserService {
  findUserById(id: UUID): Promise<UserResponseDTO>;
  findAllUsers(): Promise<UserResponseDTO[]>;
}
