import { UUID } from "crypto";
import { inject } from "inversify";
import UserService from "./UserService";
import UserRepository from "../repositories/UserRepository";
import CustomError from "../util/CustomError";
import User from "../models/User";

export default class UserServiceImp implements UserService {
  constructor(
    @inject("userRepository") private userRepository: UserRepository
  ) {}

  async findAllUsers(): Promise<User[]> {
    const data = await this.userRepository.findAll();

    const users = data.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.created_at ? new Date(user.created_at) : new Date(),
          user.updated_at ? new Date(user.updated_at) : new Date()
        )
    );

    return users;
  }

  async findUserById(id: UUID): Promise<User> {
    const data = await this.userRepository.findByPK(id);

    if (!data) throw new CustomError("User not found", 404);

    const foundUser = new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.created_at ? new Date(data.created_at) : new Date(),
      data.updated_at ? new Date(data.updated_at) : new Date()
    );

    return foundUser;
  }
}
