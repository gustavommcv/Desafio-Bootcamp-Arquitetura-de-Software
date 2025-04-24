import { inject, injectable } from "inversify";
import userService from "../services/userService";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import customError from "../util/customError";

@injectable()
export default class userController {
  constructor(@inject("userService") private userService: userService) {}

  getUserById = async (request: Request, response: Response) => {
    try {
      const data = matchedData(request);

      const foundUser = await this.userService.findUserById(data.id);

      response.json({
        foundUser,
      });
    } catch (error) {
      if (error instanceof Error)
        if (error instanceof customError) {
          response.status(error.status).json(error.message);
        } else {
          response.status(500).json(error.message);
        }
    }
  };
}
