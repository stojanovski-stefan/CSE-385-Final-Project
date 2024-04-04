var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "EtxiZU5{LmRdFyPGA&(",
  port: 3306,
  // required for older versions of mySQL community server (8.0.36)
  authPlugin: "mysql_native_password",
});

connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");

  // DB query
  let sql =
    "SELECT name, id, `character`, role FROM netflix.credits WHERE name = 'Vladimir Kulich' LIMIT 1;";
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    // console.log(JSON.stringify(result));
    console.log(result);
  });

  // stop DB connection
  connection.end((error) => {
    if (error) {
      console.error("Error closing MySQL connection:", error);
      return;
    }

    console.log("MySQL connection closed.");
  });
});
