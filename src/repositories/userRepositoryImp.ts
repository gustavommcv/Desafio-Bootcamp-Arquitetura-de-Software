import { UUID } from "crypto";
import userRepository from "./userRepository";
import { query } from "../database/database";

export default class userRepositoryImp implements userRepository {
  tableName: string;

  constructor() {
    this.tableName = "users";
  }

  async findByPK(pk: UUID): Promise<object> {
    const results = await query(
      `SELECT * FROM ${this.tableName}
        WHERE id = ?`,
      [pk]
    );

    return results[0];
  }
}
