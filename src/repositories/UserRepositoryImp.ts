import { UUID } from "crypto";
import { query } from "../database/database";
import { IUser } from "../models/User";
import UserRepository from "./UserRepository";

export default class UserRepositoryImp implements UserRepository {
  tableName: string;

  constructor() {
    this.tableName = "users";
  }

  async findAll(): Promise<IUser[]> {
    const results = await query(`SELECT * FROM ${this.tableName}`);

    return results;
  }

  async findByPK(pk: UUID): Promise<IUser | null> {
    const results = await query(
      `SELECT * FROM ${this.tableName}
        WHERE id = ?`,
      [pk]
    );

    return (results[0] as IUser) || null;
  }
}
