const mockedDB = require("./mockerData/mockedDB");
jest.mock("./mockerData/mockedDB");

describe("GET /getList", () => {
  test("should return 200 OK and added worker", async () => {
    const response = await mockedDB.getList();
    expect(response.status).toBe(200);
    expect(typeof response.data).toBe("object");
  });
});

describe("GET /profile", () => {
  test("should return 200 OK and added worker", async () => {
    const response = await mockedDB.profile();
    expect(response.status).toBe(200);
    expect(typeof response.data).toBe("object");
  });
});
