const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkJWT = require("express-jwt");

function apiRouter(database) {

    const router = express.Router();

    router.get("/api/user", (req, res) => {

    })

    return router;
}