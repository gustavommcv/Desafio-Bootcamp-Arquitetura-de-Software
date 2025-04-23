import express, { Response, Request, json } from "express";
import indexRouter from "./routes/indexRouter";

const server = express();

server.use(json());

server.get("/", (_: Request, response: Response) => {
  response.json({
    message: "Hello, world!",
    endpoints: ["/api - Use este endpoint para ver os endpoints disponiveis"],
  });
});

server.use("/api", indexRouter);

export default server;
