
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

const id = new ObjectId();

MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
        return console.log("Unable to connect");
    }

    // console.log("Connected to DB correctly.");
    const db = client.db(dbName);
    // db.collection("users").insertOne({
    //     name: "alqama",
    //     age: 24
    // }, (error, result) => {
    //     if (error) return console.log("Unable to insert user.");
    //     console.log(result);
    // });
    // db.collection("users").insertMany([
    //     { name: "ali", age: 21 },
    //     { name: "Zainab", age: 29 },
    //     { name: "Waqar", age: 28 }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert users in Collection.");
    //     }
    //     console.log(result);
    // });

    // db.collection("tasks").insertMany([
    //     { description: "morning walk", completed: false },
    //     { description: "meet with legend", completed: false },
    //     { description: "hair cut", completed: true },
    // ], (error, result) => {
    //     if (error) return console.log("Unable to add Task in Database.");
    //     console.log(result);
    // });

    // db.collection("users").findOne({ name: "ali" }, (error, user) => {
    //     console.log(user);
    // });

    // db.collection('tasks').find({}).toArray((error, res) => {
    //     if (error) return console.log("Unable to find any Task.");
    //     console.log(res);
    // });
    // db.collection('tasks').countDocuments((error, res) => {
    //     if (error) return console.log("Unable to find any Task.");
    //     console.log(res);
    // });

    // db.collection("users").updateOne({ name: "alqama" }, { $set: { name: "usama", age: 26 } }).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // });

    db.collection("users").deleteOne({ name: "alqama" }).then(user => {
        console.log("User deleted from DB, " + user);
    }).catch(err => {
        console.log("Can't Delete user.");
    });

});





