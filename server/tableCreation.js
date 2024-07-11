const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pluralsight@987",
  database: "bookstore",
});

// connection.query(
//   "CREATE TABLE Authors (author_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,biography TEXT);",
//   function (err, results, fields) {
//     console.log(err); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// connection.query(
//   "CREATE TABLE Genres (genre_id INT AUTO_INCREMENT PRIMARY KEY,genre_name VARCHAR(255) NOT NULL);",
//   function (err, results, fields) {
//     console.log(err); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// //         A simple SELECT query
// connection.query(
//   "CREATE TABLE Books (book_id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL,author_id INT NOT NULL,genre_id INT NOT NULL,price DECIMAL(10, 2) NOT NULL,publication_date DATE NOT NULL,FOREIGN KEY (author_id) REFERENCES Authors(author_id),FOREIGN KEY (genre_id) REFERENCES Genres(genre_id));",
//   function (err, results, fields) {
//     console.log(err); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// connection.query(
//           "INSERT INTO Authors (name, biography) VALUES('J.K. Rowling', 'British author, best known for the Harry Potter series.'),('George Orwell', 'English novelist, essayist, journalist, and critic.'),('J.R.R. Tolkien', 'English writer, poet, philologist, and academic.'),('Agatha Christie', 'English writer known for her sixty-six detective novels and fourteen short story collections.');",
//   function (err, results, fields) {
//     console.log(err); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// connection.query(
//           "INSERT INTO Genres (genre_name) VALUES('Fantasy'),('Science Fiction'),('Mystery'),('Historical Fiction'),('Non-Fiction');",
//   function (err, results, fields) {
//     console.log(err); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// connection.query(
//   "INSERT INTO Books (title, author_id, genre_id, price, publication_date) VALUES('Harry Potter and the Philosophers Stone', 1, 1, 19.99, '1997-06-26'),('1984', 2, 2, 14.99, '1949-06-08'),('The Hobbit', 3, 1, 17.99, '1937-09-21'),('Murder on the Orient Express', 4, 3, 12.99, '1934-01-01'),('The Lord of the Rings', 3, 1, 29.99, '1954-07-29');",
//   function (err, results, fields) {
//     console.log(err); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );