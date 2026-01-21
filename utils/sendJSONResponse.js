export const sendJSONResponse = (res, statusCode, payload) => {
  res.setHeader("Content-Type", "application/json");
  /* This is to avoid CORS error, to make everyone use this API with GET method */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  /* *** */
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
};
