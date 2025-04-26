import { Router } from "express";
import container from "../di-container";
import ProductController from "../controllers/ProductController";
import { body, param, query } from "express-validator";
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

productRouter.get("/count", productController.getCount.bind(productController));

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

productRouter.delete(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isUUID()
    .withMessage("Id must be a UUID"),
  validationErrors,
  productController.deleteProduct.bind(productController)
);

productRouter.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isString()
      .withMessage("Name must be a string"),
    body("description")
      .notEmpty()
      .withMessage("Description cannot be empty")
      .isString()
      .withMessage("Description must be a string"),
    body("price")
      .notEmpty()
      .withMessage("Price cannot be empty")
      .isNumeric()
      .withMessage("Price must be a number")
      .custom((value) => value > 0)
      .withMessage("Price must be greater than 0"),
  ],
  validationErrors,
  productController.createProduct.bind(productController)
);

export default productRouter;
