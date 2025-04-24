import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import UserService from "../services/UserService";
import CustomError from "../util/CustomError";

@injectable()
export default class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  private getUserLinks(userId: string) {
    return {
      self: { method: "GET", href: `/users/${userId}` },
      update: { method: "PUT", href: `/users/${userId}` },
      delete: { method: "DELETE", href: `/users/${userId}` },
    };
  }

  getUserById = async (request: Request, response: Response) => {
    try {
      const { id } = matchedData(request);

      const user = await this.userService.findUserById(id);

      response.status(200).json({
        data: user,
        links: this.getUserLinks(user.id),
      });
    } catch (error) {
      if (error instanceof Error)
        if (error instanceof CustomError) {
          response.status(error.status).json(error.message);
        } else {
          console.error("Internal Error:", error);
          response.status(500).json({ error: "Internal Server Error" });
        }
    }
  };

  getUsers = async (_: Request, response: Response) => {
    try {
      const users = await this.userService.findAllUsers();

      const usersWithLinks = users.map((user) => ({
        ...user,
        links: this.getUserLinks(user.id),
      }));

      response.status(200).json({
        data: usersWithLinks,
        links: {
          self: { method: "GET", href: "/users" },
          create: { method: "POST", href: "/users" },
        },
      });
    } catch (error) {
      console.error("Internal Error:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  };
}
