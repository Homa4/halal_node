const events = require("events");
const { EventEmitter } = require("events");

class Chat extends EventEmitter {}

const chat = new Chat();

chat.on("message", () => {
  console.log("👺 bombardiro-crocodilo");
});

chat.once("message", () => {
  console.log("💣 gusito-bimbito");
});

chat.emit("message");
chat.emit("message");
chat.emit("message");
