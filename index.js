const shell = require("shelljs");
const moment = require("moment");
const express = require("express");
const tokens = require("./token");

const app = express();
const port = 3000;

app.use((request, response, next) => {
  log("Request recieved:", request.protocol, request.method, request.path);
  log("Query parameters:", request.query);
  log("Request headers:", request.headers);
  next();
});

app.delete("/off", (request, response) => {
  token = tokens.IFTTT;

  if (request.query.delay) {
    delay = parseInt(request.query.delay) !== NaN ? request.query.delay : 1;
  } else {
    delay = 1;
  }
  delay = Math.max(delay, 1);
  log(`Shutdown requested in ${delay} minutes`);

  script = ["bash pi-off.sh", "pi_off", token, delay].join(" ");
  log(`Running script: ${script}`);
  shell.exec(script, { silent: true }, (exitCode, stdout) =>
    logSplit(stdout.split("\n"))
  );

  response.statusCode = 204;
  response.json({});
  log("Response:", response.statusCode, response.statusMessage);
});

app.listen(port, err => {
  if (err) {
    return log("Error:", err);
  }

  log(`Server is listening on ${port}`);
});

function log() {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`, ...arguments);
}

function logSplit(array) {
  array.forEach(element => {
    if (element.length !== 0) {
      log("Script output:", element);
    }
  });
}
