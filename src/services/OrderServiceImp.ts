import { inject, injectable } from "inversify";
import { Order, OrderItem } from "../models/Order";
import OrderService from "./OrderService";
import OrderRepository from "../repositories/OrderRepository";

@injectable()
export default class OrderServiceImp implements OrderService {
  constructor(
    @inject("OrderRepository") private orderRepository: OrderRepository
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const ordersData = await this.orderRepository.findAll();

    return ordersData.map(
      (orderData) =>
        new Order(
          orderData.id,
          orderData.userId,
          new Date(orderData.orderDate),
          orderData.totalAmount,
          orderData.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.productId,
                item.quantity,
                item.unitPrice,
                new Date(item.createdAt)
              )
          ),
          new Date(orderData.createdAt),
          new Date(orderData.updatedAt)
        )
    );
  }
}
