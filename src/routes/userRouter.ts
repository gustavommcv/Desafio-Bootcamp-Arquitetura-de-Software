import { Router } from "express";
import { body, param } from "express-validator";
import validationErrors from "../middlewares/validationErrors";
import container from "../di-container";
import UserController from "../controllers/UserController";

const userRouter = Router();

const userController = container.get(UserController);

userRouter.get("/", userController.getUsers.bind(userController));

userRouter.get("/count", userController.getUserCount.bind(userController));

userRouter.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isUUID()
    .withMessage("Id must be a UUID"),
  validationErrors,
  userController.getUserById.bind(userController)
);

userRouter.delete("/", userController.deleteUser.bind(userController));

userRouter.put(
  "/",
  [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password")
      .optional()
      .isStrongPassword()
      .withMessage("Password too weak"),
  ],
  validationErrors,
  userController.editUser.bind(userController)
);

export default userRouter;
