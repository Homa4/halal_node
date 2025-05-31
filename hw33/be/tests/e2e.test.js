const request = require("supertest");
const app = require("../app");

describe("🧪 E2E Auth Flow", () => {
  test("Register + Login flow", async () => {
    const registerRes = await request(app)
      .post("/public/register")
      .send({ email: "test@example.com", password: "1234" });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.message).toBe("User registered");

    const loginRes = await request(app)
      .post("/public/login")
      .send({ email: "test@example.com", password: "1234" });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.message).toBe("Login successful");
    expect(loginRes.headers["set-cookie"]).toBeDefined();
  });

  test("Login fails with wrong password", async () => {
    const res = await request(app)
      .post("/public/login")
      .send({ email: "test@example.com", password: "wrong" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
