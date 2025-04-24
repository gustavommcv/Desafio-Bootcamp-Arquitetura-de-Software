import { UUID } from "crypto";
import { inject } from "inversify";
import user from "../models/User";
import UserService from "./UserService";
import UserRepository from "../repositories/UserRepository";
import CustomError from "../util/CustomError";

export default class UserServiceImp implements UserService {
  constructor(
    @inject("userRepository") private userRepository: UserRepository
  ) {}

  async findUserById(id: UUID): Promise<user> {
    const data = await this.userRepository.findByPK(id);

    if (!data) throw new CustomError("User not found", 404);

    const foundUser = new user(
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
