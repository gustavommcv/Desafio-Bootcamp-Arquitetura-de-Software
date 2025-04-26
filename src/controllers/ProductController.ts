import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import ProductService from "../services/ProductService";
import { matchedData } from "express-validator";
import CustomError from "../util/CustomError";

@injectable()
export default class ProductController {
  constructor(
    @inject("ProductService") private productService: ProductService
  ) {}

  private getProductLinks(productId: string) {
    return {
      self: { method: "GET", href: `/products/${productId}` },
      update: { method: "PUT", href: `/products/${productId}` },
      delete: { method: "DELETE", href: `/products/${productId}` },
    };
  }

  getProducts = async (_: Request, response: Response) => {
    try {
      const products = await this.productService.findAllProducts();

      const productsWithLinks = products.map((product) => ({
        ...product,
        links: this.getProductLinks(product.id),
      }));

      response.status(200).json({
        data: productsWithLinks,
        links: {
          self: { method: "GET", href: "/products" },
          create: { method: "POST", href: "/products" },
        },
      });
    } catch (error) {
      console.error("Internal Error:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  };

  getProductById = async (request: Request, response: Response) => {
    try {
      const { id } = matchedData(request);

      const product = await this.productService.findProductById(id);

      response.status(200).json({
        data: product,
        links: this.getProductLinks(product.id),
      });
    } catch (error) {
      if (error instanceof Error)
        if (error instanceof CustomError) {
          response.status(error.status).json({ message: error.message });
        } else {
          console.error("Internal Error:", error);
          response.status(500).json({ error: "Internal Server Error" });
        }
    }
  };

  getProductByName = async (request: Request, response: Response) => {
    try {
      const { name } = matchedData(request);

      const products = await this.productService.findProductsByName(name);

      const productsWithLinks = products.map((product) => ({
        ...product,
        links: this.getProductLinks(product.id),
      }));

      response.status(200).json({
        data: productsWithLinks,
        links: {
          self: { method: "GET", href: "/products" },
          create: { method: "POST", href: "/products" },
        },
      });
    } catch (error) {
      if (error instanceof Error)
        if (error instanceof CustomError) {
          response.status(error.status).json({ message: error.message });
        } else {
          console.error("Internal Error:", error);
          response.status(500).json({ error: "Internal Server Error" });
        }
    }
  };
}
