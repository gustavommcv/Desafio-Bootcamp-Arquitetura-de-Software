import { inject, injectable } from "inversify";
import { IOrder, Order, OrderItem } from "../models/Order";
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

  async searchOrdersByName(searchTerm: string): Promise<Order[]> {
    const ordersData = await this.orderRepository.findByName(searchTerm);

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

  async createOrder(order: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }): Promise<Order> {
    if (!order.userId) {
      throw new CustomError("User ID is required", 400);
    }

    if (!order.items || order.items.length === 0) {
      throw new CustomError("Order must have at least one item", 400);
    }

    for (const item of order.items) {
      if (!item.productId) {
        throw new CustomError("Product ID is required for all items", 400);
      }
      if (item.quantity <= 0) {
        throw new CustomError("Quantity must be greater than 0", 400);
      }
    }

    const orderData = await this.orderRepository.create(order);

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

  // Adicione na classe OrderServiceImp
  async updateOrder(
    id: string,
    order: {
      userId?: string;
      items?: Array<{ productId: string; quantity: number }>;
    }
  ): Promise<Order> {
    if (!id) {
      throw new CustomError("Order ID is required", 400);
    }

    if (order.items && order.items.length === 0) {
      throw new CustomError("Order must have at least one item", 400);
    }

    if (order.items) {
      for (const item of order.items) {
        if (!item.productId) {
          throw new CustomError("Product ID is required for all items", 400);
        }
        if (item.quantity <= 0) {
          throw new CustomError("Quantity must be greater than 0", 400);
        }
      }
    }

    const orderData = await this.orderRepository.update(id, order);

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

  async deleteOrder(id: string): Promise<void> {
    if (!id) {
      throw new CustomError("Order ID is required", 400);
    }
    
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new CustomError("Order not found", 404);
    }

    await this.orderRepository.delete(id);
  }
}
