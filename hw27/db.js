const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_collections = process.env.DB_COLLECTIONS;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.uxclstd.mongodb.net/${db_name}?retryWrites=true&w=majority`;

async function connectToDb() {
  await mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log("✅ connecte to db"),
      (err) => {
        console.log("❌ something went wrong: ", err);
      };
  });
}

// connectToDb();

module.exports = connectToDb;
