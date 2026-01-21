import http from "node:http";
import { getDataFromDB } from "./database/db";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  if (req.url === "/api" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(200).end(JSON.stringify(destinations));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(404).end(
      JSON.stringify({
        error: "not found",
        message: "The requested route does not exist",
      }),
    );
  }
});

server.listen(PORT, console.log(`Server listening on: http://localhost:8000`));
