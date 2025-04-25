import UserResponseDTO from "../dto/UserResponseDTO";

export default interface AuthService {
  login(email: string, password: string): Promise<UserResponseDTO>;
  register(name: string, email: string, password: string): Promise<UserResponseDTO>;
}
