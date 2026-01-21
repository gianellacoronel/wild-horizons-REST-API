import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, destinations);
  } else if (req.url.startsWith("/api/continent")) {
    const continent = req.url.split("/").pop();
    const filterContinentDestinations = (await getDataFromDB()).filter(
      (place) => place.continent.toLowerCase() === continent.toLowerCase(),
    );
    sendJSONResponse(res, 200, filterContinentDestinations);
  } else {
    sendJSONResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, console.log(`Server listening on: http://localhost:8000`));
