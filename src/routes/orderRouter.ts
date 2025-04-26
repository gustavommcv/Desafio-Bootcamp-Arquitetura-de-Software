import { Router } from "express";
import container from "../di-container";
import OrderController from "../controllers/OrderController";

const orderRouter = Router();

const orderController = container.get(OrderController);

orderRouter.get("/", orderController.getAllOrders.bind(orderController));

export default orderRouter;
