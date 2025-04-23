import { inject, injectable } from "inversify";
import UserService from "../services/UserService";

@injectable()
class UserController {
    constructor(@inject("UserService") private userService: UserService) {}
}