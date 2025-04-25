import { Request, Response, Router } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import productRouter from "./productRouter";

const indexRouter = Router();

indexRouter.get("/", (_: Request, response: Response) => {
  response.json({
    endpoints: ["/user - user endpoints"],
  });
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/products", productRouter);

export default indexRouter;
