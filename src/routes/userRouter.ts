import { Router } from "express";
import { param } from "express-validator";
import validationErrors from "../middlewares/validationErrors";
import container from "../di-container";
import UserController from "../controllers/UserController";

const userRouter = Router();

const userController = container.get(UserController);

userRouter.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isUUID()
    .withMessage("Id must be a UUID"),
  validationErrors,
  userController.getUserById
);

export default userRouter;
