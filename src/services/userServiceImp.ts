import { UUID } from "crypto";
import userService from "./userService";
import { inject } from "inversify";
import userRepository from "../repositories/userRepository";
import user from "../models/user";
import customError from "../util/customError";

export default class userServiceImp implements userService {
  constructor(
    @inject("userRepository") private userRepository: userRepository
  ) {}

  async findUserById(id: UUID): Promise<user> {
    const data = await this.userRepository.findByPK(id);

    if (!data) throw new customError("User not found", 404);

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
