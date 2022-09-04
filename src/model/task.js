// const validator = require("validator");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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

// taskSchema.pre("save")

const Task = mongoose.model("Task", taskSchema);

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