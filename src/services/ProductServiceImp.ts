import { inject } from "inversify";
import Product from "../models/Product";
import ProductService from "./ProductService";
import ProductRepository from "../repositories/ProductRepository";
import { UUID } from "crypto";
import ProductRequestDTO from "../dto/ProductRequestDTO";
import CustomError from "../util/CustomError";

export default class ProductServiceImp implements ProductService {
  constructor(
    @inject("ProductRepository") private productRepository: ProductRepository
  ) {}

  async updateProduct(id: UUID, updates: ProductRequestDTO): Promise<Product> {
    try {
      const updatedProduct = await this.productRepository.updateByPK(
        id,
        updates
      );

      return new Product(
        updatedProduct.id,
        updatedProduct.name,
        updatedProduct.description,
        updatedProduct.price,
        new Date(updatedProduct.created_at),
        new Date(updatedProduct.updated_at)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Failed to update product", 500);
    }
  }

  async createProduct(product: ProductRequestDTO): Promise<Product> {
    const createdProduct = await this.productRepository.create(product);

    return new Product(
      createdProduct.id,
      createdProduct.name,
      createdProduct.description,
      createdProduct.price,
      new Date(createdProduct.created_at),
      new Date(createdProduct.updated_at)
    );
  }

  async deleteProduct(id: UUID): Promise<void> {
    try {
      await this.productRepository.deleteByPK(id);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Failed to delete product", 500);
    }
  }

  async findProductsByName(name: string): Promise<Product[]> {
    const searchName = name.trim();

    const products = await this.productRepository.findByName(searchName);

    return products as Product[];
  }

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
