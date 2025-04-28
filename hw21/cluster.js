const cluster = require("cluster");
const os = require("os");
const { exec } = require("child_process");
const express = require("express");

const cpuNumber = os.availableParallelism();

console.log(`Primary pid ${process.pid}`);

cluster.setupPrimary({
  exec: __dirname + "/server.js",
});

for (let i = 0; i < cpuNumber; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} has terminated.`);
  cluster.fork();
});
