const express = require("express");
const Task = require("../model/task");
const router = express.Router();


router.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(e);
    }
});

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }
    // Task.find({}).then(tasks => {
    //     res.send(tasks);
    // }).catch(e => {
    //     res.status(500).send();
    // });
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findById(_id);
        if (!task) return res.status(404).send("Task not found");
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch("/tasks/:id", async (req, res) => {
    const allowedUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Update" });
    }
    try {
        const _id = req.params.id;
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        const task = await Task.findById(_id);
        allowedUpdates.forEach(key => task[key] = req.body[key]);
        await task.save();
        if (!task) {
            return res.status(404).send({ error: "Task with given id is not found" });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).send({ error: "Task with given id is not found." });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;