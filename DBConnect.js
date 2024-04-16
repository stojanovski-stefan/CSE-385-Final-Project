var mysql = require("mysql");
const PropertiesReader = require("properties-reader");
const express = require("express");
const path = require("path");

const properties = PropertiesReader("./db.properties");
const server = express();

var connection = mysql.createConnection({
  host: properties.get("DB_HOST"),
  user: properties.get("DB_USER"),
  password: properties.get("DB_PASSWORD"),
  port: properties.get("DB_PORT"),
  // required for older versions of mySQL community server (8.0.36)
  authPlugin: properties.get("DB_AUTH_PLUGIN"),
});

server.get("/api/v1/data", (req, res) => {
  let searchTerm = req.query.searchTerm;
  let sql = `SELECT name, id, role FROM netflix.credits WHERE name = '${searchTerm}' LIMIT 10;`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results); // Return data as JSON
    }
  });
});

server.use(express.static(path.join(__dirname, "html")));

// Start the server, listens on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
