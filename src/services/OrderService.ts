import { UUID } from "crypto";
import { Order } from "../models/Order";

export default interface OrderService {
  getAllOrders(): Promise<Order[]>;
  searchOrdersByName(searchTerm: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order>;
  //   createOrder(orderData: {
  //     userId: string;
  //     items: Array<{ productId: string; quantity: number }>;
  //   }): Promise<Order>;
  //   updateOrder(id: UUID, updates: Partial<{ status: string }>): Promise<Order>;
  //   deleteOrder(id: UUID): Promise<void>;
  //   getUserOrders(userId: UUID): Promise<Order[]>;
}
