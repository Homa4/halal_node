const mongoose = require("mongoose");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;

async function connectToDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.uxclstd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        dbName: name,
      }
    );
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ Error while connecting to DB", err);
  }
}

module.exports = { connectToDb };
