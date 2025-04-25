export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export default class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public created_at: Date = new Date(),
    public updated_at: Date = new Date()
  ) {}
}
