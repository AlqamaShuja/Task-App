const express = require("express");
const Task = require("../model/task");
const router = express.Router();
const auth = require("../middleware/auth");


router.post("/tasks", auth, async (req, res) => {
    try {
        // const task = new Task(req.body);
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});


// GET /tasks?completed=true
// GET /tasks?limit=value&limit=value
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id });
        const match = {}
        const sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.sortBy) {
            const part = req.query.sortBy.split(":");
            sort[part[0]] = part[1] === "desc" ? -1 : 1
        }

        await req.user.populate({
            path: "tasks",
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }
    // Task.find({}).then(tasks => {
    //     res.send(tasks);
    // }).catch(e => {
    //     res.status(500).send();
    // });
});

router.get("/tasks/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) return res.status(404).send("Task not found");
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch("/tasks/:id", auth, async (req, res) => {
    const allowedUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Update" });
    }
    try {
        const _id = req.params.id;
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send({ error: "Task with given id is not found" });
        }
        updates.forEach(key => task[key] = req.body[key]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send({ error: "Task with given id is not found." });
        }
        // await task.remove();
        res.send({ message: "Task deleted" });
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;