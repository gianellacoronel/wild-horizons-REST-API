import http from "node:http";
import { getDataFromDB } from "./database/db";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  if (req.url === "/api" && req.method === "GET") {
    res.end(JSON.stringify(destinations));
  }
});

server.listen(PORT, console.log(`Server listening on: http://localhost:8000`));
