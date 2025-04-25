import { Router } from "express";
import container from "../di-container";
import ProductController from "../controllers/ProductController";

const productRouter = Router();

const productController = container.get(ProductController);

productRouter.get("/", productController.getProducts.bind(productController));

export default productRouter;
