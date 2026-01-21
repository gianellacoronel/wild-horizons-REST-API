import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  // res.write helps us to send amount of data
  // We still need to add res.end
  res.write("This is some data \n");
  res.write("This is some data \n");

  //res.end({data}, {encoding type , default utf8}, {callback function that executes at the end of the process})
  res.end("This is from the server", "utf8", () => console.log("response end"));
});

server.listen(PORT, console.log(`Server listening on: http://localhost:8000`));

const server1 = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    // it's important to use UPPERCASE
    res.end("This is from the server");
  }
});
