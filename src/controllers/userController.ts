import { inject, injectable } from "inversify";
import userService from "../services/userService";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

@injectable()
export default class userController {
  constructor(@inject("userService") private userService: userService) {}

  getUserById = (request: Request, response: Response) => {
    const data = matchedData(request);

    response.json({
      data,
    });
  };
}
