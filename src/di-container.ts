import { Container } from "inversify";
import UserService from "./services/UserService";
import UserServiceImp from "./services/UserServiceImp";

const container = new Container();

container.bind<UserService>("UserService").to(UserServiceImp);
