import { Container } from "inversify";
import userController from "./controllers/UserController";
import UserRepositoryImp from "./repositories/UserRepositoryImp";
import UserServiceImp from "./services/UserServiceImp";
import UserService from "./services/UserService";
import AuthController from "./controllers/AuthController";
import AuthService from "./services/AuthService";
import AuthServiceImp from "./services/AuthServiceImp";
import ProductService from "./services/ProductService";
import ProductServiceImp from "./services/ProductServiceImp";
import ProductRepository from "./repositories/ProductRepository";
import UserRepository from "./repositories/UserRepository";
import ProductRepositoryImp from "./repositories/ProductRepositoryImp";
import ProductController from "./controllers/ProductController";
import OrderService from "./services/OrderService";
import OrderServiceImp from "./services/OrderServiceImp";
import OrderRepository from "./repositories/OrderRepository";
import OrderRepositoryImp from "./repositories/OrderRepositoryImp";
import OrderController from "./controllers/OrderController";
const container = new Container();

container.bind<UserService>("UserService").to(UserServiceImp);
container.bind<AuthService>("AuthService").to(AuthServiceImp);
container.bind<ProductService>("ProductService").to(ProductServiceImp);
container.bind<OrderService>("OrderService").to(OrderServiceImp);

container.bind<UserRepository>("UserRepository").to(UserRepositoryImp);
container.bind<ProductRepository>("ProductRepository").to(ProductRepositoryImp);
container.bind<OrderRepository>("OrderRepository").to(OrderRepositoryImp);

container.bind(userController).toSelf();
container.bind(AuthController).toSelf();
container.bind(ProductController).toSelf();
container.bind(OrderController).toSelf();

export default container;
