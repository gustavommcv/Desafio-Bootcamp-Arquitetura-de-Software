export interface IOrder {
  id: string;
  userId: string;
  orderDate: Date;
  totalAmount: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export class Order implements IOrder {
  constructor(
    public id: string,
    public userId: string,
    public orderDate: Date,
    public totalAmount: number,
    public items: OrderItem[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  toResponseDTO() {
    return {
      id: this.id,
      userId: this.userId,
      orderDate: this.orderDate,
      totalAmount: this.totalAmount,
      items: this.items.map((item) => item.toResponseDTO()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class OrderItem {
  constructor(
    public id: string,
    public productId: string,
    public quantity: number,
    public unitPrice: number,
    public createdAt: Date
  ) {}

  toResponseDTO() {
    return {
      id: this.id,
      productId: this.productId,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      subtotal: this.quantity * this.unitPrice,
      createdAt: this.createdAt,
    };
  }
}
