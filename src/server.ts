import express, { Response, Request, json } from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/indexRouter";

const server = express();

server.use(json());
server.use(cookieParser());

server.get("/", (_: Request, response: Response) => {
  response.json({
    message: "Hello, world!",
    endpoints: ["/api - Use this endpoint to see all endpoints"],
  });
});

server.use("/api", indexRouter);

export default server;
