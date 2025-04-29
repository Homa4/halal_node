const { Worker, isMainThread, parentPort } = require("worker_threads");
const os = require("os");
const factorial = require("./calculations");

// const cpuCount = os.availableParallelism();

if (isMainThread) {
  const worker = new Worker(__filename);

  worker.on("message", (...args) => {
    console.log({ args });
  });

  worker.on("error", (err) => {
    console.log(err.stack);
  });

  worker.on("exit", (code) => {
    console.dir(code);
  });
} else {
  parentPort.postMessage("Calculate factorial");
  console.time("fact");
  const res = factorial(100);
  console.timeEnd("fact");
  console.log("res", res);
}

// const factorial = require("./calculations");

// console.time("fact");
// console.log(factorial(100));
// console.timeEnd("fact");
