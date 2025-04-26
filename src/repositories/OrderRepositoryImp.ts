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
    const [order] = await query(
      `
    SELECT 
      o.*,
      oi.id as item_id, 
      oi.product_id, 
      oi.quantity, 
      oi.unit_price,
      oi.created_at as item_created_at,
      p.name as product_name
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.id = ?
  `,
      [id]
    );

    if (!order) return null;

    const items = await query(
      `
    SELECT 
      oi.*,
      p.name as product_name
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `,
      [id]
    );

    return {
      ...order,
      items: items.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        createdAt: item.created_at,
      })),
    };
  }
}
