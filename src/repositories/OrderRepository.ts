import { UUID } from "crypto";
import { IOrder } from "../models/Order";
export default interface OrderRepository {
  findAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | null>;
  findByName(searchTerm: string): Promise<IOrder[]>;
  create(order: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }): Promise<IOrder>;
  update(
    id: string,
    order: {
      userId?: string;
      items?: Array<{ productId: string; quantity: number }>;
    }
  ): Promise<IOrder>;
  //   deleteByPK(id: UUID): Promise<void>;
  //   findByUserId(userId: UUID): Promise<IOrder[]>;
}
