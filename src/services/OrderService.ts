import { UUID } from "crypto";
import { Order } from "../models/Order";

export default interface OrderService {
  //   createOrder(orderData: {
  //     userId: string;
  //     items: Array<{ productId: string; quantity: number }>;
  //   }): Promise<Order>;
  //   getOrderById(id: UUID): Promise<Order>;
  //   getUserOrders(userId: UUID): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  //   updateOrder(id: UUID, updates: Partial<{ status: string }>): Promise<Order>;
  //   deleteOrder(id: UUID): Promise<void>;
}
