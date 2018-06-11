const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./router/api-router");
var cors = require('cors');

function createExpressApp(database) {

    const app = express();

    app.use(cors({ origin: 'http://localhost:4200' }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(apiRouter(database));
    app.use("*", (req, res) => {

        res.sendFile(path.join(__dirname, "public/index.html"));

    });
    return app;
}

module.exports = createExpressApp;