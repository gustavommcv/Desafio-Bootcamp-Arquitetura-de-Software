import { Router } from "express";
import container from "../di-container";
import ProductController from "../controllers/ProductController";
import { param, query } from "express-validator";
import validationErrors from "../middlewares/validationErrors";

const productRouter = Router();

const productController = container.get(ProductController);

productRouter.get("/", productController.getProducts.bind(productController));

productRouter.get(
  "/search",
  query("name").notEmpty().withMessage("Name cannot be empty"),
  validationErrors,
  productController.getProductByName.bind(productController)
);

productRouter.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isUUID()
    .withMessage("Id must be a UUID"),
  validationErrors,
  productController.getProductById.bind(productController)
);


export default productRouter;
