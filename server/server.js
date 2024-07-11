const express = require("express");
const mysql = require("mysql2");
const server = express();
var cors = require('cors')

server.use(express.json());
server.use(cors())

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pluralsight@987",
  database: "bookstore",
});
const port = 3001;
// BOOKS API's
server.get("/books", (req, res) => {
  let dbQuery = `SELECT 
    b.book_id, 
    b.title, 
    b.price, 
    b.publication_date, 
    a.name AS author_name, 
    a.author_id,
    g.genre_name,
    g.genre_id
FROM 
    Books b
JOIN 
    Authors a ON b.author_id = a.author_id
JOIN 
    Genres g ON b.genre_id = g.genre_id`
  connection.query(dbQuery, (err, result, fields) => {
    console.log(err);
    res.send(result);
  });
});
server.get("/books/:book_id", (req, res) => {
  let book_id = req.params.book_id;
  let dbQuery = `SELECT 
    b.book_id, 
    b.title, 
    b.price, 
    b.publication_date, 
    a.name AS author_name, 
    g.genre_name,
    a.author_id,
    g.genre_id
FROM 
    Books b
JOIN 
    Authors a ON b.author_id = a.author_id
JOIN 
    Genres g ON b.genre_id = g.genre_id
WHERE 
    b.book_id = ${book_id};`

  connection.query(
    dbQuery,
    (err, result, fields) => {
      res.send(result);
    }
  );
});
server.post("/books", (req, res) => {
  let { title, author_id, genre_id, price, publication_date } = req.body;
  let dbQuery = `INSERT INTO Books (title, author_id, genre_id, price, publication_date) VALUES("${title}", ${author_id}, ${genre_id}, ${price},"${publication_date}");`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
server.put("/books/:book_id", (req, res) => {
  let book_id = req.params.book_id;
  let { title, author_id, genre_id, price, publication_date } = req.body;
  let dbQuery = `UPDATE Books SET title = '${title}', author_id = ${author_id}, genre_id = ${genre_id}, price = ${price}, publication_date = '${publication_date}' WHERE book_id = ${book_id};`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
server.delete("/books/:book_id", (req, res) => {
  let book_id = req.params.book_id;
  let dbQuery = `DELETE FROM Books WHERE book_id = ${book_id};`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
// AUTHORS API's
server.get("/authors", (req, res) => {
  connection.query("SELECT * from Authors", (err, result, fields) => {
    res.send(result);
  });
});
server.get("/authors/:author_id", (req, res) => {
  let author_id = req.params.author_id;
  connection.query(
    "SELECT * from Books WHERE author_id=" + author_id,
    (err, result, fields) => {
      res.send(result);
    }
  );
});
server.post("/authors", (req, res) => {
  let { name, biography } = req.body;
  let dbQuery = `INSERT INTO Authors (name, biography) VALUES("${name}", "${biography}");`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
server.put("/authors/:author_id", (req, res) => {
  let author_id = req.params.author_id;
  let { name, biography } = req.body;
  let dbQuery = `UPDATE Authors SET name = '${name}', biography = '${biography}' WHERE author_id=${author_id}`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
server.delete("/authors/:author_id", (req, res) => {
  let author_id = req.params.author_id;
  let dbQuery = `DELETE FROM Authors WHERE author_id = ${author_id};`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
// GENRES API's
server.get("/genres", (req, res) => {
  connection.query("SELECT * from Genres", (err, result, fields) => {
    res.send(result);
  });
});
server.get("/genres/:genre_id", (req, res) => {
  let genre_id = req.params.genre_id;
  connection.query(
    "SELECT * from Genres WHERE genre_id=" + genre_id,
    (err, result, fields) => {
      res.send(result);
    }
  );
});
server.post("/genres", (req, res) => {
  let { genre_name } = req.body;
  let dbQuery = `INSERT INTO Genres (genre_name) VALUES("${genre_name}");`;
  console.log(dbQuery);
  connection.query(dbQuery, function (err, results, fields) {
    console.log(err); // results contains rows returned by server
    res.send(200);
  });
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
