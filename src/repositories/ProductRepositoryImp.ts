import { UUID } from "crypto";
import { query } from "../database/database";
import { IProduct } from "../models/Product";
import ProductRepository from "./ProductRepository";
import CustomError from "../util/CustomError";

export default class ProductRepositoryImp implements ProductRepository {
  tableName: string;

  constructor() {
    this.tableName = "products";
  }

  async findByPK(pk: UUID): Promise<IProduct> {
    const results = await query(
      `SELECT * FROM ${this.tableName}
          WHERE id = ?`,
      [pk]
    );

    if (!results[0]) {
      throw new CustomError("Product not found", 404);
    }

    return results[0] as IProduct;
  }

  async findAll(): Promise<IProduct[]> {
    const results = await query(`SELECT * FROM ${this.tableName}`);

    return results;
  }
}
