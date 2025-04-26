import { inject, injectable } from "inversify";
import { Order, OrderItem } from "../models/Order";
import OrderService from "./OrderService";
import OrderRepository from "../repositories/OrderRepository";
import CustomError from "../util/CustomError";

@injectable()
export default class OrderServiceImp implements OrderService {
  constructor(
    @inject("OrderRepository") private orderRepository: OrderRepository
  ) {}

  async getOrderById(id: string): Promise<Order> {
    const orderData = await this.orderRepository.findById(id);

    if (!orderData) {
      throw new CustomError("Order not found", 404);
    }

    return new Order(
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
    );
  }

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
