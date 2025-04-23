export default class user extends Object {
  name: string;

  constructor() {
    super();
    this.name = "Gustavo";
  }

  override toString(): string {
    return this.name;
  }
}
