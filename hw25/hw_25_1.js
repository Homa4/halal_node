const express = require("express");
const connectToDb = require("./db");

const app = express();
app.use(express.json());

const connection = connectToDb();

app.get("/", (req, res) => {
  res.status(200).send("wellcome home my friend");
});

app.get("/availableRooms", (req, res) => {
  const date = req.query.date;
  if (!date) return res.status(400).send("Missing ?date=YYYY-MM-DD");

  const sql = `
    SELECT *
    FROM Rooms r
    WHERE r.status = 'available'
      AND NOT EXISTS (
        SELECT 1 FROM Bookings b
        WHERE b.room_id = r.idR
          AND b.check_in <= ?
          AND b.check_out > ?
      );
  `;

  connection.query(sql, [date, date], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post("/addGuest", (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).send("firstName and lastName are required");
  }

  const sql = `
    INSERT INTO Guests (first_name, last_name, email, phone)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [firstName, lastName, email || null, phone || null],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      res.json({ guestId: result.insertId });
    }
  );
});

app.post("/bookRoom", (req, res) => {
  const { guestId, roomId, checkIn, checkOut } = req.body;
  if (!guestId || !roomId || !checkIn || !checkOut) {
    return res
      .status(400)
      .send("guestId, roomId, checkIn and checkOut are required");
  }

  connection.query(
    `SELECT price FROM Rooms WHERE idR = ?`,
    [roomId],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      if (rows.length === 0) return res.status(404).send("Room not found");
      const price = parseFloat(rows[0].price);
      const days =
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      const totalPrice = days * price;

      const sql = `
        INSERT INTO Bookings
          (guest_id, room_id, check_in, check_out, total_price)
        VALUES (?, ?, ?, ?, ?)
      `;

      connection.query(
        sql,
        [guestId, roomId, checkIn, checkOut, totalPrice],
        (err2, result2) => {
          if (err2) return res.status(500).send(err2.message);
          res.json({ bookingId: result2.insertId, totalPrice });
        }
      );
    }
  );
});

app.get("/revenue", (req, res) => {
  const year = parseInt(req.query.year, 10);
  const month = parseInt(req.query.month, 10);
  if (!year || !month) {
    return res.status(400).send("Missing ?year=YYYY&month=MM");
  }

  const sql = `
    SELECT SUM(total_price) AS revenue
    FROM Bookings
    WHERE YEAR(check_in) = ? AND MONTH(check_in) = ?
  `;

  connection.query(sql, [year, month], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json({ revenue: rows[0].revenue || 0 });
  });
});

app.listen(3000, () => {
  console.log("Server listening: http://localhost:3000");
});
