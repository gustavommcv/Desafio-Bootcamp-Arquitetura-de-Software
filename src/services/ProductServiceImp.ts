import { inject } from "inversify";
import Product from "../models/Product";
import ProductService from "./ProductService";
import ProductRepository from "../repositories/ProductRepository";

export default class ProductServiceImp implements ProductService {
  constructor(
    @inject("ProductRepository") private productRepository: ProductRepository
  ) {}

  async findAllProducts(): Promise<Product[]> {
    const data = await this.productRepository.findAll();

    const products = data.map(
      (product) =>
        new Product(
          product.id,
          product.name,
          product.description,
          product.price,
          product.created_at ? new Date(product.created_at) : new Date(),
          product.updated_at ? new Date(product.updated_at) : new Date()
        )
    );

    return products;
  }
}
