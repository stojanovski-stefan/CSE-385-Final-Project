const mysql = require("mysql");
const PropertiesReader = require("properties-reader");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// holds all sql queries.
const queries = require("./html/js/queries.js");
// reads credentials from the data source.
const properties = PropertiesReader("./db.properties");
// creates a local server that the user can connect to.
const server = express();
const port = 3000;

/*
 * Connects to a mysql database using the credentials
 * from a data source.
 */
var connection = mysql.createConnection({
  host: properties.get("DB_HOST"),
  user: properties.get("DB_USER"),
  password: properties.get("DB_PASSWORD"),
  port: properties.get("DB_PORT"),
  // required for older versions of mySQL community server (8.0.36)
  authPlugin: properties.get("DB_AUTH_PLUGIN"),
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/*
 * API endpoint that gets all book data from the database.
 */
server.get("/api/v1/data", (req, res) => {
  connection.query(queries.allBooks, (error, results, fields) => {
    res.json(results); // Return data as JSON
  });
});

/*
 * Dynamic endpoint for filters.
 */
server.get(`/api/v1/:filter`, (req, res) => {
  // extracts filter search term from URL
  let { filter } = req.params;
  console.log(filter);

  // Checks if filter exists
  if (queries.hasOwnProperty(filter)) {
    let sql = queries[filter];
    try {
      connection.query(sql, (error, results, fields) => {
        res.json(results);
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      res.status(500).json({ error: "500 error, cannot fetch data" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

server.post("/api/v1/search", (req, res) => {
  try {
    let request = req.body;
    console.log(request);
    let sql = `SELECT * 
               FROM bookdata.books_data 
               WHERE title 
               LIKE '%${request.searchTerm}%' 
               OR categories 
               LIKE '%${request.searchTerm}%' 
               OR authors 
               LIKE '%${request.searchTerm}%' 
               ORDER BY ratingsCount 
               DESC LIMIT 50;`;
    connection.query(sql, (error, results, fields) => {
      res.json(results);
    });
  } catch (error) {
    console.error("Error uploading review: ", error);
    res.status(500).json({ error: "Cannot Upload Review" });
  }
});

server.get(`/api/:bookTitle`, (req, res) => {
  const { bookTitle } = req.params;
  console.log(bookTitle);

  const sql = `SELECT books_data.title, profile_name, review, review_summary, review_text 
               FROM bookdata.books_data
               INNER JOIN bookdata.books_rating ON books_data.title = books_rating.title
               WHERE books_data.title = ?`;

  connection.query(sql, [bookTitle], (error, results, fields) => {
    if (error) {
      console.error("Error fetching book reviews: ", error);
      return res
        .status(500)
        .json({ error: `Cannot get reviews for ${bookTitle}` });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: `No reviews found for ${bookTitle}` });
    }

    res.json(results);
  });
});

server.post("/api/v1/upload-review", (req, res) => {
  try {
    let request = req.body;
    console.log(request);

    connection.query(
      `INSERT INTO bookdata.books_rating (title, profile_name, review, review_summary, review_text)
       VALUES ('${request.bookName}', '${request.name}', ${parseInt(
        request.rating
      )}, '${request.summary}', "${request.review}");`
    );

    res.sendFile(path.join(__dirname, "html", "pages", "confirm.html"));
  } catch (error) {
    console.error("ERROR:", error);
    res.sendFile(path.join(__dirname, "html", "pages", "error.html"));
  }
});

// Gives the server access to all of the HTML, CSS, and JS files.
server.use(express.static(path.join(__dirname, "html")));

// Start the server, listens on port 3000
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
