import { Container } from "inversify";
import userController from "./controllers/UserController";
import UserRepositoryImp from "./repositories/UserRepositoryImp";
import UserServiceImp from "./services/UserServiceImp";
import UserService from "./services/UserService";
import AuthController from "./controllers/AuthController";
import AuthService from "./services/AuthService";
import AuthServiceImp from "./services/AuthServiceImp";
const container = new Container();

container.bind<UserService>("UserService").to(UserServiceImp);
container.bind<AuthService>("AuthService").to(AuthServiceImp);

container.bind<UserRepositoryImp>("UserRepository").to(UserRepositoryImp);

container.bind(userController).toSelf();
container.bind(AuthController).toSelf();

export default container;
