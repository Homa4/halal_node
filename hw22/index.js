const cP = require("child_process");
const { stdout } = require("process");

cP.exec("ls", (error, stdout) => {
  if (error) {
    console.log(error);
  } else {
    console.log(stdout);
  }
});
