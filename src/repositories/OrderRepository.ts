import { UUID } from "crypto";
import { IOrder } from "../models/Order";
export default interface OrderRepository {
  //   create(order: {
  //     userId: string;
  //     items: Array<{ productId: string; quantity: number; unitPrice: number }>;
  //   }): Promise<IOrder>;
  //   findByPK(id: UUID): Promise<IOrder>;
  //   findByUserId(userId: UUID): Promise<IOrder[]>;
  findAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | null>;
  //   updateByPK(id: UUID, updates: Partial<IOrder>): Promise<IOrder>;
  //   deleteByPK(id: UUID): Promise<void>;
}
