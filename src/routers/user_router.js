const express = require("express");
const User = require("../model/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
    // User.find({}).then(users => {
    //     res.send(users);
    // }).catch(e => {
    //     res.status(500).send();
    // });
});

router.get("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("User not Found.")
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send("User not Found.")
    //     }
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

router.patch("/users/:id", async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidUpdate = update.every((eachUpdateItem) => allowedUpdates.includes(eachUpdateItem));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Updates" });
    }
    try {
        const _id = req.params.id;
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        const user = await User.findById(_id);
        allowedUpdates.forEach(key => user[key] = req.body[key]);
        user.save();
        if (!user) {
            return res.status(404).send({ error: "User not found with given id." });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send({ error: "User with given id is not found." });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;