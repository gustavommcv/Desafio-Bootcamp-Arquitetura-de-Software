import { Container } from "inversify";
import userService from "./services/userService";
import userServiceImp from "./services/userServiceImp";
import userController from "./controllers/userController";
import userRepository from "./repositories/userRepository";
import userRepositoryImp from "./repositories/userRepositoryImp";
const container = new Container();

container.bind<userService>("userService").to(userServiceImp);

container.bind<userRepository>("userRepository").to(userRepositoryImp);

container.bind(userController).toSelf();

export default container;
