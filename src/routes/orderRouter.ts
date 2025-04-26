import { Router } from "express";
import container from "../di-container";
import OrderController from "../controllers/OrderController";
import { param, query } from "express-validator";
import validationErrors from "../middlewares/validationErrors";

const orderRouter = Router();

const orderController = container.get(OrderController);

orderRouter.get("/", orderController.getAllOrders.bind(orderController));

orderRouter.get("/count", orderController.getCount.bind(orderController));

orderRouter.get(
  "/search",
  query("name").notEmpty().withMessage("Search term cannot be empty"),
  validationErrors,
  orderController.searchOrders.bind(orderController)
);

orderRouter.get(
  "/:id",
  param("id").isUUID().withMessage("Invalid order ID"),
  validationErrors,
  orderController.getOrderById.bind(orderController)
);

export default orderRouter;
