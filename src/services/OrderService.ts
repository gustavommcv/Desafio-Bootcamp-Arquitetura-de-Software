import { Order } from "../models/Order";

export default interface OrderService {
  getAllOrders(): Promise<Order[]>;
  searchOrdersByName(searchTerm: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order>;
  createOrder(order: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }): Promise<Order>;
  updateOrder(
    id: string,
    order: {
      userId?: string;
      items?: Array<{ productId: string; quantity: number }>;
    }
  ): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
  //   getUserOrders(userId: UUID): Promise<Order[]>;
}
