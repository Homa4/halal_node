const express = require("express");
// const connection = require("./db");
const router = express.Router();
const connectToDb = require("./db.js");

const connection = connectToDb();

router.get("/", (req, res) => {
  res.status(200).send("wellcome home my friend");
});

router.post("/addGuests", async (req, res) => {
  try {
    const users = [
      {
        firstName: "Іван",
        lastName: "Петренко",
        email: "ivan.petrenko@example.com",
        phone: "+380501112233",
      },
      {
        firstName: "Ольга",
        lastName: "Ковальчук",
        email: "olga.kovalchuk@example.com",
        phone: "+380673334455",
      },
      {
        firstName: "Марія",
        lastName: "Шевченко",
        email: "maria.shevchenko@example.com",
        phone: "+380631223344",
      },
      {
        firstName: "Павло",
        lastName: "Іванович",
        email: "pavlo.ivanovich@example.com",
        phone: "+380677887766",
      },
      {
        firstName: "Світлана",
        lastName: "Гнатюк",
        email: "svitlana.hnatyuk@example.com",
        phone: "+380664445566",
      },
    ];

    const values = users.map((u) => [
      u.firstName,
      u.lastName,
      u.email,
      u.phone,
    ]);

    const sql = `INSERT INTO Guests (first_name, last_name, email, phone) VALUES ?`;
    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error("👹 Insert error:", err.message);
        connection.end();
        return;
      }
      console.log(
        `✅ Додано ${result.affectedRows} гостей, початковий ID = ${result.insertId}`
      );
      connection.end();
    });
  } catch (err) {
    console.log("👹 hehehe, something went wrong, here is probleb:\n ", err);
  }
});
module.exports = router;
