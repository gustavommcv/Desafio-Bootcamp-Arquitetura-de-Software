import { UUID } from "crypto";
import { query } from "../database/database";
import { IProduct } from "../models/Product";
import ProductRepository from "./ProductRepository";
import CustomError from "../util/CustomError";
import ProductRequestDTO from "../dto/ProductRequestDTO";

export default class ProductRepositoryImp implements ProductRepository {
  tableName: string;

  constructor() {
    this.tableName = "products";
  }

  async updateByPK(pk: UUID, updates: Partial<IProduct>): Promise<IProduct> {
    const fieldsToUpdate = [];
    const values = [];

    if (updates.name !== undefined) {
      fieldsToUpdate.push("name = ?");
      values.push(updates.name);
    }

    if (updates.description !== undefined) {
      fieldsToUpdate.push("description = ?");
      values.push(updates.description);
    }

    if (updates.price !== undefined) {
      fieldsToUpdate.push("price = ?");
      values.push(updates.price);
    }

    if (fieldsToUpdate.length === 0) {
      throw new CustomError("No valid fields to update", 400);
    }

    fieldsToUpdate.push("updated_at = CURRENT_TIMESTAMP");
    values.push(pk);

    const queryString = `
    UPDATE ${this.tableName} 
    SET ${fieldsToUpdate.join(", ")} 
    WHERE id = ?
  `;

    await query(queryString, values);
    return await this.findByPK(pk);
  }

  async deleteByPK(pk: UUID): Promise<void> {
    const result = await query(`DELETE FROM ${this.tableName} WHERE id = ?`, [
      pk,
    ]);

    if (result.affectedRows === 0) {
      throw new CustomError("Product not found", 404);
    }
  }

  async create(product: ProductRequestDTO): Promise<IProduct> {
    const productId = crypto.randomUUID();

    await query(
      `INSERT INTO ${this.tableName} (id, name, description, price, created_at, updated_at)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [productId, product.name, product.description, product.price]
    );

    const createdProduct = await this.findByPK(productId);
    return createdProduct;
  }

  async findByName(name: string): Promise<IProduct[]> {
    const results = await query(
      `SELECT * FROM ${this.tableName}
     WHERE name LIKE ?`,
      [`%${name}%`]
    );

    if (results.length === 0) {
      throw new CustomError("No products found with that name", 404);
    }

    return results as IProduct[];
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
