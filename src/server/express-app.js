const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./router/api-router");
var cors = require('cors');

function createExpressApp(database) {

    const app = express();

    app.use(cors({ origin: 'http://localhost:4200' }));
    app.use(bodyParser.json());
    // app.use(express.static(path.join(__dirname, "public")));
    // app.use("*", (req, res) => {

    //     res.sendFile(path.join(__dirname, "public/index.html"));

    // });
    app.use(apiRouter(database));
    return app;
}

module.exports = createExpressApp;