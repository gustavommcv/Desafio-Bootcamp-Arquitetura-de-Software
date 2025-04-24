import { Request, Response, Router } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";

const indexRouter = Router();

indexRouter.get("/", (_: Request, response: Response) => {
  response.json({
    endpoints: ["/user - user endpoints"],
  });
});

indexRouter.use("/user", userRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;
