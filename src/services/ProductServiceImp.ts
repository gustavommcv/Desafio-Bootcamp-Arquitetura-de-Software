import { inject } from "inversify";
import Product from "../models/Product";
import ProductService from "./ProductService";
import ProductRepository from "../repositories/ProductRepository";
import { UUID } from "crypto";

export default class ProductServiceImp implements ProductService {
  constructor(
    @inject("ProductRepository") private productRepository: ProductRepository
  ) {}

  async findProductById(id: UUID): Promise<Product> {
    const data = await this.productRepository.findByPK(id);

    const foundProduct = new Product(
      data.id,
      data.name,
      data.description,
      data.price,
      data.created_at ? new Date(data.created_at) : new Date(),
      data.updated_at ? new Date(data.updated_at) : new Date()
    );

    return foundProduct;
  }

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
