const express = require("express");
const multer = require("multer");
const User = require("../model/user");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (error) {
    //     res.status(500).send();
    // }
    // User.find({}).then(users => {
    //     res.send(users);
    // }).catch(e => {
    //     res.status(500).send();
    // });
});

// router.get("/users/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send("User not Found.")
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send();
//     }
//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send("User not Found.")
//     //     }
//     //     res.send(user);
//     // }).catch((error) => {
//     //     res.status(500).send();
//     // });
// });

router.patch("/users/me", auth, async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidUpdate = update.every((eachUpdateItem) => allowedUpdates.includes(eachUpdateItem));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Updates" });
    }
    try {
        // const _id = req.params.id;
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        // const user = await User.findById(_id);
        update.forEach(key => req.user[key] = req.body[key]);
        await req.user.save();
        // if (!user) {
        //     return res.status(404).send({ error: "User not found with given id." });
        // }
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        // const _id = req.body._id;
        // const user = await User.findByIdAndDelete(_id);
        // if (!user) {
        //     return res.status(404).send({ error: "User with given id is not found." });
        // }
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // res.send({ user: user.getPublicProfile(), token });
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: "Unable to login" });
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send({ message: "Logout Successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error on Logout" });
    }
});

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({ message: "Successfully Logout from all devices" })
    } catch (error) {
        res.status(500).send({ error: "Error on Logout" });
    }
});

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)/)) {
            return cb(new Error("Image must be png, jpg or jpeg Format"));
        }
        cb(undefined, true)
    }
});

router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send("Uploaded")
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete("/users/me/avatar", auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.status(200).send("Avatar Deleted");
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, please check your connection" });
    }

});

// GET avatar by user ID
router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set("Content-Type", "image/jpg");
        res.send(user.avatar);
    } catch (error) {
        res.status(400).send();
    }
});



// <img src="data:image/jpg;base64," />

module.exports = router;