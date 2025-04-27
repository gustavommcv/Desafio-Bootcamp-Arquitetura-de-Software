import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import OrderService from "../services/OrderService";
import CustomError from "../util/CustomError";

@injectable()
export default class OrderController {
  constructor(@inject("OrderService") private orderService: OrderService) {}

  private getOrderLinks(orderId: string) {
    return {
      self: {
        method: "GET",
        href: `/orders/${orderId}`,
      },
      update: {
        method: "PUT",
        href: `/orders/${orderId}`,
      },
      delete: {
        method: "DELETE",
        href: `/orders/${orderId}`,
      },
      items: {
        method: "GET",
        href: `/orders/${orderId}/items`,
      },
    };
  }

  getOrderById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);

      res.status(200).json({
        data: order.toResponseDTO(),
        links: this.getOrderLinks(order.id),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ message: error.message });
      } else {
        console.error("Get order error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  getAllOrders = async (_: Request, res: Response) => {
    try {
      const orders = await this.orderService.getAllOrders();

      const response = {
        data: orders.map((order) => ({
          ...order.toResponseDTO(),
          links: this.getOrderLinks(order.id),
        })),
        links: {
          self: { method: "GET", href: "/orders" },
          create: { method: "POST", href: "/orders" },
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ message: error.message });
      } else {
        console.error("Get all orders error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  getCount = async (_: Request, res: Response) => {
    try {
      const ordersLength = (await this.orderService.getAllOrders()).length;

      const response = {
        data: ordersLength,
        links: {
          self: { method: "GET", href: "/orders/count" },
          create: { method: "POST", href: "/orders" },
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ message: error.message });
      } else {
        console.error("Get all orders error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  searchOrders = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      const orders = await this.orderService.searchOrdersByName(name as string);

      const response = {
        data: orders.map((order) => ({
          ...order.toResponseDTO(),
          links: this.getOrderLinks(order.id),
        })),
        links: {
          self: { method: "GET", href: `/orders/search?name=${name}` },
          all: { method: "GET", href: "/orders" },
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ message: error.message });
      } else {
        console.error("Search orders error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  createOrder = async (req: Request, res: Response) => {
    try {
      const { userId, items } = req.body;

      if (!userId || !items) {
        throw new CustomError("userId and items are required", 400);
      }

      if (!Array.isArray(items)) {
        throw new CustomError("items must be an array", 400);
      }

      for (const item of items) {
        if (!item.productId || item.quantity === undefined) {
          throw new CustomError(
            "Each item must have productId and quantity",
            400
          );
        }
      }

      const order = await this.orderService.createOrder({
        userId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      res.status(201).json({
        data: order.toResponseDTO(),
        links: this.getOrderLinks(order.id),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ message: error.message });
      } else {
        console.error("Create order error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
