import { UUID } from "crypto";
import { query } from "../database/database";
import { IUser } from "../models/User";
import UserRepository from "./UserRepository";
import CustomError from "../util/CustomError";
import UserRequestDTO from "../dto/UserRequestDTO";

export default class UserRepositoryImp implements UserRepository {
  tableName: string;

  constructor() {
    this.tableName = "users";
  }

  async ensureEmailIsAvailable(email: string): Promise<boolean> {
    try {
      await this.findByEmail(email);
      return false;
    } catch (error) {
      return true;
    }
  }

  async create(user: UserRequestDTO): Promise<IUser> {
    const userId = crypto.randomUUID();

    await query(
      `INSERT INTO ${this.tableName} (id, name, email, password)
       VALUES (?, ?, ?, ?)`,
      [userId, user.name, user.email, user.password]
    );

    const createdUser = await this.findByPK(userId);

    return createdUser;
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
