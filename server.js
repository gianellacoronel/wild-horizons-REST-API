import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";
import { getDataByQueryParams } from "./utils/getDataByQueryParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);

  // The query params we are accepting are:
  // 'country', 'continent', and 'is_open_to_public'.
  if (urlObj.pathname === "/api" && req.method === "GET") {
    let filteredData = getDataByQueryParams(destinations, queryObj);
    sendJSONResponse(res, 200, filteredData);
  } else if (req.url.startsWith("/api/continent")) {
    const continent = req.url.split("/").pop();
    const filterContinentDestinations = getDataByPathParams(
      destinations,
      "continent",
      continent,
    );
    sendJSONResponse(res, 200, filterContinentDestinations);
  } else if (req.url.startsWith("/api/country")) {
    const country = req.url.split("/").pop();
    const filterCountryDestinations = getDataByPathParams(
      destinations,
      "country",
      country,
    );
    sendJSONResponse(res, 200, filterCountryDestinations);
  } else {
    sendJSONResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, console.log(`Server listening on: http://localhost:8000`));
