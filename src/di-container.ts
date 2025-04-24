import { Container } from "inversify";
import userController from "./controllers/UserController";
import UserRepositoryImp from "./repositories/UserRepositoryImp";
import UserServiceImp from "./services/UserServiceImp";
import UserService from "./services/UserService";
const container = new Container();

container.bind<UserService>("userService").to(UserServiceImp);
container.bind<UserRepositoryImp>("userRepository").to(UserRepositoryImp);
container.bind(userController).toSelf();

export default container;
