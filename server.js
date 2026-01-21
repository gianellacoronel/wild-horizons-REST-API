import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.end("A string");
});

server.listen(PORT, console.log(`Server listening on: http://localhost:8000`));
