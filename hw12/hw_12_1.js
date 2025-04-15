const express = require("express");
const fs = require("fs");
const { connectToDb } = require("./data/db");
const crypto = require("crypto");
const logger = require("./data/logger");

const app = express();
const PORT = 3000;

let collection;
(async () => {
  try {
    collection = await connectToDb();
    if (!collection) {
      console.log("❌ DB connection failed");
      return;
    }
  } catch (err) {
    console.log("❌ something wrong with collection");
  }
})();

app.get("/", async (req, res) => {
  logger(req, res);
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Home page");
});

app.get("/getTasks", async (req, res) => {
  logger(req, res);
  try {
    const tasks = await collection.find().toArray();
    // console.log(tasks);
    const jsonData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync("./data/tasks.json", jsonData, "utf8");
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/postTask", async (req, res) => {
  logger(req, res);
  try {
    const obj = {
      title: "Learn NOde",
      description: "Understand how routing and middleware work",
      status: "todo",
      createdAt: "2025-04-06T14:12:00Z",
    };
    const tasks = await collection.insertOne(obj);
    const taskList = await collection.find().toArray();
    const jsonData = JSON.stringify(taskList, null, 2);
    fs.writeFileSync("./data/tasks.json", jsonData, "utf8");
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.put("/updateTask", async (req, res) => {
  logger(req, res);
  try {
    let taskList = await collection.find().toArray();
    console.log("taskList[taskList.length - 1]", taskList[taskList.length - 1]);
    const tasks = await collection.updateOne(taskList[taskList.length - 1], {
      $set: {
        title: "Learn English",
      },
    });
    taskList = await collection.find().toArray();
    const jsonData = JSON.stringify(taskList, null, 2);
    fs.writeFileSync("./data/tasks.json", jsonData, "utf8");
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.delete("/deleteTask", async (req, res) => {
  logger(req, res);
  try {
    let taskList = await collection.find().toArray();
    const tasks = await collection.deleteOne(taskList[0]);
    taskList = await collection.find().toArray();
    const jsonData = JSON.stringify(taskList, null, 2);
    fs.writeFileSync("./data/tasks.json", jsonData, "utf8");
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
