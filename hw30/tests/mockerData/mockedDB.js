module.exports = {
  connectToDb: jest.fn(async () => {
    console.log("🧪 Mock DB connected");
  }),

  getList: jest.fn(async () => {
    return {
      status: 200,
      data: [
        {
          name: "Dmytro Bondar",
          age: 35,
          position: "DevOps Engineer",
          salary: 55000,
          email: "dmytro.bondar@example.com",
          password: "DevOpsD2025@",
        },
        {
          name: "Olena Koval",
          age: 32,
          position: "Project Manager",
          salary: 50000,
          email: "olena.koval@example.com",
          password: "OlenaK#321",
        },
        {
          name: "Ivan Petrenko",
          age: 28,
          position: "Frontend Developer",
          salary: 42000,
          email: "ivan.petrenko@example.com",
          password: "IvanP@2024",
        },
        {
          name: "Svitlana Shevchenko",
          age: 30,
          position: "QA Engineer",
          salary: 40000,
          email: "svitlana.shevchenko@example.com",
          password: "SvitlanaQ!30",
        },
        {
          name: "Andriy Melnyk",
          age: 40,
          position: "Backend Developer",
          salary: 60000,
          email: "andriy.melnyk@example.com",
          password: "AndriyM#4000",
        },
      ],
    };
  }),
  profile: jest.fn(async () => {
    return {
      status: 200,
      data: {
        name: "Dmytro Bondar",
        age: 35,
        position: "DevOps Engineer",
        salary: 55000,
        email: "dmytro.bondar@example.com",
        password: "DevOpsD2025@",
      },
    };
  }),
};
