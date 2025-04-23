import { Container } from "inversify";
import userService from "./services/userService";
import userServiceImp from "./services/userServiceImp";
import userController from "./controllers/userController";
const container = new Container();

container.bind<userService>("userService").to(userServiceImp);
container.bind(userController).toSelf();

export default container;
