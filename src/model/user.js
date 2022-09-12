const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid.");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number.");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(pass) {
            // if (validator.isLength(pass, min = 6)) {
            //     throw new Error("Password must be greater than 6 character.");
            // }
            if (pass.toLowerCase().includes("password")) {
                throw new Error("Password does not contain word 'password'")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'iamlearningnode');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

// userSchema.methods.getPublicProfile = function () {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;
//     delete userObject.tokens;
//     return userObject;
// }



//Virtual property (relationship b/t two entity) --> It is not a prop stored in a DB 
// It is a relationship beween two entity
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
});


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
}

userSchema.pre("save", async function (next) {
    const user = this;
    // console.log("Middleware is running");
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model("User", userSchema);

// const user1 = new User({
//     name: "   waqas   ",
//     email: "wakas@gmail.cOM",
//     password: "p342"
// });

// user1.save().then(() => {
//     console.log(user1);
// }).catch((error) => {
//     console.log(error)
// });


module.exports = User;