require("dotenv").config();

const users = require("./test-user.json");

const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const path = require("path");

function seedCollection(collectionName, initialRecords) {

    MongoClient.connect(process.env.DB_CONN, (err, database) => {
        console.log("Connected to mongoDB driver!!", process.env.DB_CONN);
        if (err) {

            console.log("Here is the error", err);

        } else {
            const myDB = database.db('ld-readit')
            const db = myDB.collection(collectionName);

            db.remove();

            initialRecords.forEach((item) => {
                item.password = bcrypt.hashSync(item.password, 10);
            });



            db.insertMany(initialRecords, (err, result) => {

                console.log(`Number of data inserted:${result.insertedCount}`);
                console.log("closing connection!!");
                database.close();
            });
        }
    });
}


seedCollection('users', users);