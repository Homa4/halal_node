const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

// console.log({
//   host: "localhost",
//   user: process.env.USER_NAME,
//   password: process.env.PASSWORD,
//   database: process.env.DB_NAME,
// });

function connectToDb() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error("👹 hehehe, something went wrong:", err);
      return;
    }
    console.log("✅ Connected to db successfully!");
  });

  return connection;
}

// connectToDb();

module.exports = connectToDb;
