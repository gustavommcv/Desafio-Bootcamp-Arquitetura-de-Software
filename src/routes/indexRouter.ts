import { Request, Response, Router } from "express";
import userRouter from "./userRouter";

const indexRouter = Router();

indexRouter.get("/", (request: Request, response: Response) => {
  response.json({
    endpoints: ["/user - user endpoints"],
  });
});

indexRouter.use("/user", userRouter);

export default indexRouter;
