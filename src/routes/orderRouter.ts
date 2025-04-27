import { Router } from "express";
import container from "../di-container";
import OrderController from "../controllers/OrderController";
import { body, param, query } from "express-validator";
import validationErrors from "../middlewares/validationErrors";

const orderRouter = Router();

const orderController = container.get(OrderController);

orderRouter.post(
  "/",
  [
    body("userId").isUUID().withMessage("User ID must be a valid UUID"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Order must have at least one item"),
    body("items.*.productId")
      .isUUID()
      .withMessage("Product ID must be a valid UUID"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validationErrors,
  orderController.createOrder.bind(orderController)
);

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

orderRouter.put(
  "/:id",
  [
    param("id").isUUID().withMessage("Invalid order ID"),
    body("userId")
      .optional()
      .isUUID()
      .withMessage("User ID must be a valid UUID"),
    body("items")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Order must have at least one item"),
    body("items.*.productId")
      .optional()
      .isUUID()
      .withMessage("Product ID must be a valid UUID"),
    body("items.*.quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validationErrors,
  orderController.updateOrder.bind(orderController)
);

export default orderRouter;
