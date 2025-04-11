const { EventEmitter } = require("events");

class Chat extends EventEmitter {
  constructor() {
    super();
  }
  send(message) {
    this.emit("message", console.log(message));
  }
}

const chat = new Chat();
chat.send("😎 tralaleo-tralala");
chat.send("😎 tralaleo-tralala");
chat.send("😎 tralaleo-tralala");
