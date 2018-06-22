const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectID;

function apiRouter(database) {

    const router = express.Router();
    const dataName = database.db("ld-readit");

    router.get("/api/allArticles", (req, res) => {


        const db = dataName.collection("users");

        db.find({}).toArray((err, results) => {
            if (err || results == null) {
                console.log("Here are the errors", err);
            } else {
                res.send({ "status": 200, message: `getting response`, results });
            }
        })

    });


    router.post("/api/login", (req, res) => {
        const db = dataName.collection("users");
        if (!req.body.username) {
            res.json({ status: 401, message: "User is not available" });
        }
        else if (!req.body.password) {
            res.json({ status: 401, message: "Password was not provided" });
        } else {
            db.findOne({ name: req.body.username }, (err, results) => {
                if (results === null) {
                    res.json({ status: 401, message: "Username is wrong" });
                }
                else if (!results.password) {
                    res.send({ status: 404, message: "You are not admin" });
                }
                else {
                    const passwordCheck = bcrypt.compareSync(req.body.password, results.password);
                    if (passwordCheck) {
                        const token = jwt.sign({ userId: results._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
                        res.json({ status: 200, message: "You are sucessfully logged In", token, "username": results.name, "profile": results.imageUrl.profile });
                    } else {
                        res.json({ status: 401, message: "You have entered wrong passwrod" });
                    }
                }
            });
        }
    });


    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err });
                } else {
                    req.decoded = decoded;
                    next();
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
            db.findOne({ _id: ObjectId(req.decoded.userId) }, (err, results) => {
                if (results == null || err) {
                    res.send({ status: 404, message: "BAD request!!!" });
                }
                if (results.name == req.body.name) {
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
        }
    });

    router.put("/api/updateArticle", (req, res) => {
        const db = dataName.collection("users");
        if (!req.body.name) {
            res.send({ status: 401, message: "Username Not provided" })
        } else if (!req.body.title) {
            res.send({ status: 401, message: "No Title Provided for Article" })
        } else {
            db.findOne({ _id: ObjectId(req.decoded.userId) }, (err, results) => {
                if (results == null || err) {
                    res.send({ status: 404, message: "User Not Found!!" });
                }
                else if (results.name == req.body.name) {
                    db.findOne({ name: req.body.name }, (err, results) => {
                        if (results == null || err) {
                            res.send({ status: 404, message: "UserName not matched!" });
                        } else {
                            db.findOne({ title: req.body.title }, (err, results) => {
                                if (results == null || err) {
                                    res.send({ status: 404, message: "Title not matched!" });
                                } else {
                                    db.updateOne({ title: req.body.title }, { $set: req.body }, (err, results) => {
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
                } else {
                    res.send({ status: 402, message: "Not the logged In user!!!" });
                }
            });
        }

    });

    return router;
}

module.exports = apiRouter;
