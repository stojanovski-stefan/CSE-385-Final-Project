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

/**
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
    let sql = `SELECT * FROM bookdata.books_data WHERE title LIKE '%${request.searchTerm}%' OR categories LIKE '%${request.searchTerm}%' OR authors LIKE '%${request.searchTerm}%' ORDER BY ratingsCount DESC LIMIT 50;`;
    connection.query(sql, (error, results, fields) => {
      res.json(results);
    });
  } catch (error) {
    console.error("Error uploading review: ", error);
    res.status(500).json({ error: "Cannot Upload Review" });
  }
});

// Gives the server access to all of the HTML, CSS, and JS files.
server.use(express.static(path.join(__dirname, "html")));

// Start the server, listens on port 3000
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
