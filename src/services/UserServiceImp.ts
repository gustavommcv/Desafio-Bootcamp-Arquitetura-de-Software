import { UUID } from "crypto";
import { inject } from "inversify";
import UserService from "./UserService";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";
import UserResponseDTO from "../dto/UserResponseDTO";

export default class UserServiceImp implements UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async findAllUsers(): Promise<UserResponseDTO[]> {
    const data = await this.userRepository.findAll();

    const users = data.map((user) =>
      new User(
        user.id,
        user.name,
        user.email,
        user.password,
        user.created_at ? new Date(user.created_at) : new Date(),
        user.updated_at ? new Date(user.updated_at) : new Date()
      ).toUserResponse()
    );

    return users;
  }

  async findUserById(id: UUID): Promise<UserResponseDTO> {
    const data = await this.userRepository.findByPK(id);

    const foundUser = new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.created_at ? new Date(data.created_at) : new Date(),
      data.updated_at ? new Date(data.updated_at) : new Date()
    ).toUserResponse();

    return foundUser;
  }
}
