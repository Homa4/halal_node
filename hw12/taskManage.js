const express = require("express");
const fs = require("fs");
const { connectToDb } = require("./data/db");

const app = express();
const PORT = 3000;

async () => {
  try {
    const collection = await connectToDb();
    if (!collection) {
      console.log("❌ DB connection failed");
      return;
    }
  } catch (err) {
    console.log("❌ something wrong with collection");
  }
};

function getAll() {
  app.get("/getTasks", async (req, res) => {
    try {
      const tasks = await collection.find().toArray();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
}

function addOne(obj) {
  app.post("/postTask", async (req, res) => {
    try {
      const tasks = await collection.insertOne(obj);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
}

module.exports = { getAll, addOne };

// app.listen(PORT, () => {
//   console.log(`http://localhost:${PORT}`);
// });
