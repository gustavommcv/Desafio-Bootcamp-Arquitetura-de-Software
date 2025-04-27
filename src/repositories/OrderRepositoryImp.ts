import { query } from "../database/database";
import { IOrder } from "../models/Order";
import CustomError from "../util/CustomError";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryImp implements OrderRepository {
  async findAll(): Promise<IOrder[]> {
    const orders = await query(`
    SELECT 
      o.id,
      o.user_id as userId,
      o.order_date as orderDate,
      o.total_amount as totalAmount,
      o.created_at as createdAt,
      o.updated_at as updatedAt,
      oi.id as item_id, 
      oi.product_id as productId, 
      oi.quantity, 
      oi.unit_price as unitPrice, 
      oi.created_at as itemCreatedAt,
      p.name as productName
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    ORDER BY o.order_date DESC
  `);

    const ordersMap = new Map<string, any>();

    orders.forEach((row: any) => {
      if (!ordersMap.has(row.id)) {
        ordersMap.set(row.id, {
          id: row.id,
          userId: row.userId,
          orderDate: row.orderDate ? new Date(row.orderDate) : null,
          totalAmount: row.totalAmount,
          createdAt: row.createdAt ? new Date(row.createdAt) : null,
          updatedAt: row.updatedAt ? new Date(row.updatedAt) : null,
          items: [],
        });
      }

      if (row.item_id) {
        ordersMap.get(row.id).items.push({
          id: row.item_id,
          productId: row.productId,
          productName: row.productName,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          createdAt: row.itemCreatedAt ? new Date(row.itemCreatedAt) : null,
        });
      }
    });

    return Array.from(ordersMap.values());
  }

  async findById(id: string): Promise<IOrder | null> {
    const orders = await query(
      `
      SELECT 
        o.id,
        o.user_id as userId,
        o.order_date as orderDate,
        o.total_amount as totalAmount,
        o.created_at as createdAt,
        o.updated_at as updatedAt,
        oi.id as item_id, 
        oi.product_id as productId, 
        oi.quantity, 
        oi.unit_price as unitPrice, 
        oi.created_at as itemCreatedAt,
        p.name as productName
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = ?
      `,
      [id]
    );

    if (!orders.length) return null;

    const orderData = {
      id: orders[0].id,
      userId: orders[0].userId,
      orderDate: orders[0].orderDate ? new Date(orders[0].orderDate) : null,
      totalAmount: orders[0].totalAmount,
      createdAt: orders[0].createdAt ? new Date(orders[0].createdAt) : null,
      updatedAt: orders[0].updatedAt ? new Date(orders[0].updatedAt) : null,
      items: [] as any[],
    };

    orders.forEach((row: any) => {
      if (row.item_id) {
        orderData.items.push({
          id: row.item_id,
          productId: row.productId,
          productName: row.productName,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          createdAt: row.itemCreatedAt ? new Date(row.itemCreatedAt) : null,
        });
      }
    });

    return orderData as IOrder;
  }

  async findByName(searchTerm: string): Promise<IOrder[]> {
    const orders = await query(
      `
    SELECT DISTINCT
      o.id,
      o.user_id as userId,
      o.order_date as orderDate,
      o.total_amount as totalAmount,
      o.created_at as createdAt,
      o.updated_at as updatedAt,
      u.name as userName,
      p.name as productName
    FROM orders o
    JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE u.name LIKE ? OR p.name LIKE ?
    ORDER BY o.order_date DESC
  `,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    if (orders.length === 0) {
      throw new CustomError("No orders found matching the search term", 404);
    }

    const ordersWithItems = await Promise.all(
      orders.map(async (order: any) => {
        const items = await query(
          `
        SELECT 
          oi.id,
          oi.product_id as productId,
          oi.quantity,
          oi.unit_price as unitPrice,
          oi.created_at as createdAt,
          p.name as productName
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `,
          [order.id]
        );

        return {
          ...order,
          items: items.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          })),
        };
      })
    );

    return ordersWithItems;
  }

  async create(order: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }): Promise<IOrder> {
    const [user] = await query("SELECT id FROM users WHERE id = ?", [
      order.userId,
    ]);
    if (!user) {
      throw new CustomError(`User with ID ${order.userId} not found`, 404);
    }

    const itemsWithPrices = await Promise.all(
      order.items.map(async (item) => {
        const [product] = await query(
          "SELECT id, price FROM products WHERE id = ?",
          [item.productId]
        );

        if (!product) {
          throw new CustomError(
            `Product with ID ${item.productId} not found`,
            404
          );
        }

        return {
          ...item,
          unitPrice: product.price,
        };
      })
    );

    const totalAmount = itemsWithPrices.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const orderId = crypto.randomUUID();
    await query(
      `INSERT INTO orders (id, user_id, total_amount) VALUES (?, ?, ?)`,
      [orderId, order.userId, totalAmount]
    );

    for (const item of itemsWithPrices) {
      await query(
        `INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) 
       VALUES (UUID(), ?, ?, ?, ?)`,
        [orderId, item.productId, item.quantity, item.unitPrice]
      );
    }

    const createdOrder = await this.findById(orderId);
    if (!createdOrder) {
      throw new CustomError("Failed to retrieve created order", 500);
    }

    return createdOrder;
  }
}
