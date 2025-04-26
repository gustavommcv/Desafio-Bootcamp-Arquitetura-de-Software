import { UUID } from "crypto";
import { IOrder } from "../models/Order";
export default interface OrderRepository {
  findAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | null>;
  findByName(searchTerm: string): Promise<IOrder[]>;
  //   create(order: {
  //     userId: string;
  //     items: Array<{ productId: string; quantity: number; unitPrice: number }>;
  //   }): Promise<IOrder>;
  //   updateByPK(id: UUID, updates: Partial<IOrder>): Promise<IOrder>;
  //   deleteByPK(id: UUID): Promise<void>;
  //   findByUserId(userId: UUID): Promise<IOrder[]>;
}
