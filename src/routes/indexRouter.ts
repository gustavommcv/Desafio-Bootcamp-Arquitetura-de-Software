import { Request, Response, Router } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import productRouter from "./productRouter";
import orderRouter from "./orderRouter";

const indexRouter = Router();

indexRouter.get("/", (_: Request, response: Response) => {
  response.json({
    endpoints: ["/user - user endpoints"],
  });
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/products", productRouter);
indexRouter.use("/orders", orderRouter);

export default indexRouter;
