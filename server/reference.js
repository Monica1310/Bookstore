const express = require("express");

const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.get("/monica", (req, res) => {
  res.send("Hello, monica!");
});

server.get("/hello", (req, res) => {
  res.send("Hello, hello!");
});
server.get("/books", (req, res) => {
  // query db
  //get the data from db
  // send it to front end
  res.send([{name:"Javascript by dinesh", pages:100},{name:"Javascript by monica", pages:100}]);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
