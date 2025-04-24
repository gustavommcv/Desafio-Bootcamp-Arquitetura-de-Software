import { UUID } from "crypto";
import { query } from "../database/database";
import { IUser } from "../models/User";
import UserRepository from "./UserRepository";
import CustomError from "../util/CustomError";

export default class UserRepositoryImp implements UserRepository {
  tableName: string;

  constructor() {
    this.tableName = "users";
  }

  async findByEmail(email: string): Promise<IUser> {
    const results = await query(
      `SELECT * FROM ${this.tableName}
        WHERE email = ?`,
      [email]
    );

    if (!results[0]) {
      throw new CustomError("User not registered", 404);
    }

    return results[0] as IUser;
  }

  async findAll(): Promise<IUser[]> {
    const results = await query(`SELECT * FROM ${this.tableName}`);

    return results;
  }

  async findByPK(pk: UUID): Promise<IUser> {
    const results = await query(
      `SELECT * FROM ${this.tableName}
        WHERE id = ?`,
      [pk]
    );

    if (!results[0]) {
      throw new CustomError("User not found", 404);
    }

    return results[0] as IUser;
  }
}
