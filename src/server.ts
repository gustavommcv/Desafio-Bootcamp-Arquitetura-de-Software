import express, { Response, Request, json } from "express";

const server = express();

server.use(json());

server.get("/", (_: Request, response: Response) => {
  response.json({
    message: "Hello, world!",
    endpoints: ["/api - Use este endpoint para ver os endpoints disponiveis"],
  });
});

export default server;
