import { query } from "../database/database";
import { IOrder } from "../models/Order";
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

    // Agrupar itens por pedido
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

    // Agrupar itens
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
}
