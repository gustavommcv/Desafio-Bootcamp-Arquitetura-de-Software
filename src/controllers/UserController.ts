import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import customError from "../util/CustomError";
import UserService from "../services/UserService";

@injectable()
export default class UserController {
  constructor(@inject("userService") private userService: UserService) {}

  getUserById = async (request: Request, response: Response) => {
    try {
      const { id } = matchedData(request);

      const user = await this.userService.findUserById(id);

      response.status(200).json({
        data: user,
        links: {
          self: `/users/${user.id}`,
          update: { method: "PUT", href: `/users/${user.id}` },
        },
      });
    } catch (error) {
      if (error instanceof Error)
        if (error instanceof customError) {
          response.status(error.status).json(error.message);
        } else {
          console.error("Internal Error:", error);
          response.status(500).json({ error: "Internal Server Error" });
        }
    }
  };
}
