const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user_router");
const taskRouter = require("./routers/task_router");
const Task = require("./model/task");
const User = require("./model/user");

const app = express();
const port = process.env.PORT;

// convert json to object
app.use(express.json());

// Routes Middleware
app.use(userRouter);
app.use(taskRouter);





app.listen(port, (req, res) => {
    console.log("Server is Running on " + port);
});


module.exports = app;