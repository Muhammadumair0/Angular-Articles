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

    router.put("/api/postArticle", (req, res) => {
        const db = dataName.collection("users");
        if (!req.body.name) {
            res.send({ status: 401, message: "Username Not provided" })
        } else if (!req.body.description) {
            res.send({ status: 401, message: "Not description Provided for Article" })
        } else {
            db.findOne({ "title": req.body.title }, (err, results) => {
                if (results) {
                    res.send({ status: 204, message: "Article Title not available!" });
                } else {
                    db.insertOne(req.body, (err, results) => {
                        if (results == null || err) {
                            res.send({ status: 201, message: "article not posted successuflly!!" });
                        } else {
                            res.send({ status: 200, message: "Article successfully posted!" });
                        }
                    });
                }
            });
        }
    });

    router.put("/api/updateArticle", (req, res) => {
        const db = dataName.collection("users");
        if (!req.body.name) {
            res.send({ status: 401, message: "Username Not provided" })
        } else if (!req.body.title) {
            res.send({ status: 401, message: "Not description Provided for Article" })
        } else {
            db.findOne({ name: req.body.name }, (err, results) => {
                if (results == null || err) {
                    res.send({ status: 404, message: "UserName not matched!" });
                } else {
                    db.findOne({ title: req.body.title }, (err, results) => {
                        if (results == null || err) {
                            res.send({ status: 404, message: "Title not matched!" });
                        } else {
                            db.update({ name: req.body.name }, req.body, (err, results) => {
                                if (results == null || err) {
                                    res.send({ message: "updation unsuccessful!!" });
                                } else {
                                    res.send({ status: 200, message: "article Updated Sucessfully!!" });
                                }
                            });
                        }
                    });
                }
            });
        }

    });

    return router;
}

module.exports = apiRouter;