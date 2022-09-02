const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
    }
})

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