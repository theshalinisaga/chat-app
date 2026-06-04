console.log("USING DB HOST:", "sql12.freesqldatabase.com");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12828739",
  password: "hrer6hbmwQ",
  database: "sql12828739",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MYSQL CONNECTED 🚀");
  }
});

module.exports = db;