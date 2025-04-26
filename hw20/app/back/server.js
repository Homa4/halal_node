const express = require("express");
const { connectToDb } = require("./db");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

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

app.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.send("Home page");
});

app.get("/getList", async (req, res) => {
  try {
    const list = await collection.find().toArray();
    console.log(JSON.stringify(list, null, 2));
    return res.json(list);
  } catch (err) {
    console.error("❌ getList error:", err);
    return res
      .status(500)
      .json({ error: "Failed to retrieve list from database" });
  }
});

app.listen(3001, () => {
  console.log(`Server running on http://localhost:3001`);
});
