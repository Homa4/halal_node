const express = require("express");
const { default: mongoose } = require("mongoose");
const Groupe = require("./models/group");
const route = express.Router();

const GroupA = mongoose.model("GroupeA", Groupe, "A-31");
const GroupB = mongoose.model("GroupeB", Groupe, "B-31");

route.get("/", (req, res) => {
  res.send("welcome my friend");
});

route.get("/getAllStudents", async (req, res) => {
  try {
    const groupA = await GroupA.find();
    const groupB = await GroupB.find();
    console.log("👨‍🎓 all students:", [...groupA, ...groupB]);
    res.status(200).send(`👨‍🎓 all students: ${[...groupA, ...groupB]}`);
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});

route.put("/updateOne", async (req, res) => {
  try {
    await GroupA.updateOne({ age: { $gt: 21 } }, { age: 33 });
    const groupA = await GroupA.find();
    console.log(groupA);
    res.status(200).send(`${groupA}`);
    // res.end();
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});

route.delete("/deleteOne", async (req, res) => {
  try {
    await GroupA.deleteOne({ name: "Dmytro" });
    const groupA = await GroupA.find();
    console.log(groupA);
    res.status(200).send(`${groupA}`);
    // res.end();
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});

route.get("/studentsUpperTwenty", async (req, res) => {
  try {
    const groupA = await GroupA.find({ age: { $gt: 20 } });
    const groupB = await GroupB.find({ age: { $gt: 20 } });
    console.log("👨‍🎓 all students older than twenty:", [...groupA, ...groupB]);
    res
      .status(200)
      .send(`👨‍🎓 all students oder than twenty: ${[...groupA, ...groupB]}`);
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
  //   res.send("welcome my friend");
});

route.get("/studentsWithAvgAbove85", async (req, res) => {
  try {
    const [studentsA, studentsB] = await Promise.all([
      GroupA.aggregate([
        {
          $project: {
            name: 1,
            age: 1,
            group: 1,
            marks: 1,
            avgMark: { $avg: "$marks" },
          },
        },
        { $match: { avgMark: { $gt: 85 } } },
      ]),
      GroupB.aggregate([
        {
          $project: {
            name: 1,
            age: 1,
            group: 1,
            marks: 1,
            avgMark: { $avg: "$marks" },
          },
        },
        { $match: { avgMark: { $gt: 85 } } },
      ]),
    ]);

    const students = [...studentsA, ...studentsB];
    return res.status(200).json(students);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/studentsNameStartwithA", async (req, res) => {
  try {
    const groupA = await GroupA.find({
      name: { $regex: /^A/, $options: "i" },
    }).lean();
    const groupB = await GroupB.find({
      name: { $regex: /^A/, $options: "i" },
    }).lean();

    console.log("👨‍🎓 students wich name starts with A:", [...groupA, ...groupB]);
    res
      .status(200)
      .end(`👨‍🎓 students wich name starts with A: ${[...groupA, ...groupB]}`);
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});

route.get("/groupsScore", async (req, res) => {
  // const sum = nums.reduce((acc, curr) => acc + curr, 0);
  try {
    const groupA = await GroupA.aggregate([
      {
        $project: {
          name: 1,
          age: 1,
          group: 1,
          avgMark: { $avg: "$marks" },
        },
      },
    ]);
    const groupB = await GroupB.aggregate([
      {
        $project: {
          name: 1,
          age: 1,
          group: 1,
          avgMark: { $avg: "$marks" },
        },
      },
    ]);

    const groupAScore = groupA.reduce((acc, cur) => acc + cur.avgMark, 0);
    const groupBScore = groupB.reduce((acc, cur) => acc + cur.avgMark, 0);
    const obj = {
      A: groupAScore,
      B: groupBScore,
    };
    console.log("📑 groups score:", obj);
    res.status(200).send(obj);
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});

route.get("/studentsAvgMark", async (req, res) => {
  try {
    const groupA = await GroupA.aggregate([
      {
        $project: {
          name: 1,
          age: 1,
          group: 1,
          avgMark: { $avg: "$marks" },
        },
      },
    ]);
    const groupB = await GroupB.aggregate([
      {
        $project: {
          name: 1,
          age: 1,
          group: 1,
          avgMark: { $avg: "$marks" },
        },
      },
    ]);

    const students = [...groupA, ...groupB];
    console.log("📑 students avg mark:", students);
    res.status(200).send(students);
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});

route.get("/globalMark", async (req, res) => {
  try {
    const groupA = await GroupA.aggregate([
      {
        $project: {
          name: 1,
          age: 1,
          group: 1,
          avgMark: { $avg: "$marks" },
        },
      },
    ]);
    const groupB = await GroupB.aggregate([
      {
        $project: {
          name: 1,
          age: 1,
          group: 1,
          avgMark: { $avg: "$marks" },
        },
      },
    ]);

    const students = [...groupA, ...groupB];
    let markSum = 0;
    students.forEach((student) => {
      markSum = markSum + student.avgMark;
    });
    const totalAvg = markSum / students.length;
    console.log("📑 groups avg mark:", totalAvg);
    res.status(200).send(markSum);
  } catch (err) {
    console.error("👹 hehehe, something went wrong: ", err);
  }
});
module.exports = route;
