// const validator = require("validator");
const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", taskModel);

// const task1 = new Task({
//     description: "Do your work",
//     // completed: false
// });

// task1.save().then(() => {
//     console.log(task1);
// }).catch((error) => {
//     console.log(error);
// });

module.exports = Task;