import "reflect-metadata";
import "dotenv/config";
import server from "./server";

const port = process.env.API_PORT || 3000;

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
