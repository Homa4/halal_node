const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Worker = require("../db/model/worker");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;

beforeAll(async () => {
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.uxclstd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      dbName: name,
    }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /users", () => {
  test("should return users from database", async () => {
    await Worker.create({
      name: "Dmytro Bondar",
      age: 35,
      position: "DevOps Engineer",
      salary: 55000,
      email: "dmytro.bondar@example.com",
      password: "DevOpsD2025@",
    });

    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Alice");
  });
});
