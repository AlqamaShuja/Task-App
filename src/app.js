const express = require("express");
require("./db/mongoose");
const User = require("./model/user");
const Task = require("./model/task");

const app = express();
const port = process.env.port || 3000;


app.use(express.json());

app.post("/users", (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201);
        res.send(user);
    }).catch(error => {
        res.status(400);
        res.send(error);
    })
    // res.send("Hello");
});

app.get("/users", (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    }).catch(e => {
        res.status(500).send();
    });
});

app.get("/users/:id", (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send("User not Found.")
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send();
    })
})


app.post("/tasks", (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201);
        res.send(task);
    }).catch(e => {
        res.status(400);
        res.send(e);
    });
});

app.get("/tasks", (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks);
    }).catch(e => {
        res.status(500).send();
    });
});

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then(task => {
        if (!task) return res.status(404).send("Task not found");
        res.send(task);
    }).catch(e => {
        res.status(500).send();
    });
});


app.listen(port, (req, res) => {
    console.log("Server is Running on " + port);
});