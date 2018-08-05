const express = require("express");
const app = express();
const port = 3000;

app.use((request, response, next) => {
    console.log(request.protocol, request.method, request.path);
    console.log('query', request.query);
    console.log('headers', request.headers);
    next();
});

app.delete("/", (request, response) => {
    response.statusCode = 204;
    response.json({});
});

app.listen(port, err => {
    if (err) {
        return console.log("something bad happened", err);
    }

    console.log(`server is listening on ${port}`);
});
