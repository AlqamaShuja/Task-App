const express = require("express");
require("./db/mongoose");
const User = require("./model/user");
const Task = require("./model/task");
const userRouter = require("./routers/user_router");
const taskRouter = require("./routers/task_router");

const app = express();
const port = process.env.port || 3000;


app.use(express.json());

// Routes Middleware
app.use(userRouter);
app.use(taskRouter);





app.listen(port, (req, res) => {
    console.log("Server is Running on " + port);
});


// npm i bcryptjs