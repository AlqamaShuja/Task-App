const express = require("express");
require("./db/mongoose");
// const User = require("./model/user");
// const Task = require("./model/task");
const userRouter = require("./routers/user_router");
const taskRouter = require("./routers/task_router");
const Task = require("./model/task");
const User = require("./model/user");

const app = express();
const port = process.env.port || 3000;


// Middlewares
// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.status(503).send("Sever is on maintainance, Please check it later.");
//     } else {
//         next();
//     }
// });
// convert json to object
app.use(express.json());

// Routes Middleware
app.use(userRouter);
app.use(taskRouter);





app.listen(port, (req, res) => {
    console.log("Server is Running on " + port);
});



const main = async (req, res) => {
    // const task = await Task.findById("631f3e84dcd3e34bddd6eb1a");
    // await task.populate("owner");
    // console.log(task.owner);
    const user = await User.findById("631f3e06982195576d70f6fe");
    await user.populate("tasks");
    // console.log(user.tasks)
}

// main()

// npm i bcryptjs
// npm i jsonwebtoken
// 12345678@9422898530Alq
// Sendinblue API
// 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
