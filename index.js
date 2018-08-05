const shell = require("shelljs");
const moment = require("moment");
const tokens = require("./tokens");

const express = require("express");
const app = express();
const port = 3000;

app.use((request, response, next) => {
  log(request.protocol, request.method, request.path);
  log("query parameters", request.query);
  log("request headers", request.headers);
  next();
});

app.delete("/off", (request, response) => {
  eventType = request.query.eventType || "pi_test";
  token = tokens.IFTTT;
  delay = request.query.delay || 1;
  script = ["pi-off.sh", eventType, token, delay].join(" ");

  shell.exec(script, { async: true, silent: true });
  response.statusCode = 204;
  response.json({});
});

app.listen(port, err => {
  if (err) {
    return log('Error', err);
  }

  log(`Server is listening on ${port}`);
});

function log() {
  console.log(`[${moment().format("YYYY-MM-DD HH:MM:SS")}]`, ...arguments);
}
