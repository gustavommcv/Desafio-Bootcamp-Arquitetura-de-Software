import { query } from "../database/database";
import { IProduct } from "../models/Product";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryImp implements ProductRepository {
  tableName: string;

  constructor() {
    this.tableName = "products";
  }

  async findAll(): Promise<IProduct[]> {
    const results = await query(`SELECT * FROM ${this.tableName}`);

    return results;
  }
}
