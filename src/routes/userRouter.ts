import { Router } from "express";
import { param } from "express-validator";
import validationErrors from "../middlewares/validationErrors";
import container from "../di-container";
import userController from "../controllers/userController";

const userRouter = Router();

const userControllerInstance = container.get(userController);

userRouter.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isUUID()
    .withMessage("Id must be a UUID"),
  validationErrors,
  userControllerInstance.getUserById
);

export default userRouter;
