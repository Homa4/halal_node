const { EventEmitter } = require("events");

class Chat extends EventEmitter {
  constructor() {
    super();
  }
  send(message) {
    console.log(message);
    this.emit("message", message);
  }
}

const chat = new Chat();

chat.on("message", (msg) => {
  console.log("Emitted message:", msg);
});

chat.send("😎 tralaleo-tralala");
chat.send("📞 golubito shpionito");
chat.send("💾 crotito disceto");
