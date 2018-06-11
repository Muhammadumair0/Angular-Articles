const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkJWT = require("express-jwt");

function apiRouter(database) {

    const router = express.Router();
    const dataName = database.db("ld-readit");

    router.get("/api/allArticles", (req, res) => {


        const db = dataName.collection("users");

        db.find({}).toArray((err, results) => {
            if (err) {
                console.log("Here are the errors", err);
            } else {
                res.send({ "status": 200, message: `getting response`, results });
            }
        })

    });


    router.post("/api/user", (req, res) => {
        if (!req.body.username) {
            res.send({ status: 401, message: "Username not provided" });
        } else if (!req.body.password) {
            res.send({ status: 401, message: "Password not provided" });

        } else {
            const db = dataName.collection("users");
            db.findOne({ "name": req.body.username }, (err, results) => {
                if (results == null || err) {
                    res.send({ status: 401, message: "Username Not Found" });
                } else {
                    const passwordCheck = bcrypt.compareSync(req.body.password, results.password);
                    if (passwordCheck) {
                        res.send({ status: 200, message: "Authentication Successful", results });
                    } else {
                        res.send({ status: 404, message: "Wrong Password" });
                    }
                }
            });
        }
    });
    return router;
}

module.exports = apiRouter;