const shell = require("shelljs");
const moment = require("moment");
const express = require("express");
const tokens = require("./tokens");

const app = express();
const port = 3000;

app.use((request, response, next) => {
  log(request.protocol, request.method, request.path);
  log("query parameters", request.query);
  log("request headers", request.headers);
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

  script = ["pi-off.sh", "pi_off", token, delay].join(" ");
  shell.exec(script, { async: true, silent: true });

  response.statusCode = 204;
  response.json({});
});

app.listen(port, err => {
  if (err) {
    return log("Error", err);
  }

  log(`Server is listening on ${port}`);
});

function log() {
  console.log(`[${moment().format("YYYY-MM-DD HH:MM:SS")}]`, ...arguments);
}
