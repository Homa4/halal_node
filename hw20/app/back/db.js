const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_collection = process.env.DB_COLLECTION;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.uxclstd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log(db_name);

async function connectToDb() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(db_name);
    const collection = db.collection(db_collection);
    console.log("✅ Connected to DB");
    return collection;
  } catch (err) {
    console.error("❌ Error while connecting to DB", err);
    return null;
  }
}

module.exports = { connectToDb };
