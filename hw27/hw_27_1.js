const express = require("express");
const connectToDb = require("./db");
const route = require("./routes");

const app = express();
connectToDb();

app.use("/", route);
app.use("/getAllStudents", route);
app.use("/updateOne", route);
app.use("/deleteOne", route);
app.use("/studentsUpperTwenty", route);
app.use("/studentsWithAvgAbove85", route);
app.use("/studentsNameStartwithA", route);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
