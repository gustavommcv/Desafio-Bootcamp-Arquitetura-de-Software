import { UUID } from "crypto";
import userService from "./userService";
import user from "../models/user";

export default class userServiceImp implements userService {
  findUserById(id: UUID): Promise<user> {
    return new Promise(user.toString);
  }
}
