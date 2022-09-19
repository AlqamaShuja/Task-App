const mongoose = require("mongoose");
// MONGODB_URL
mongoose.connect(process.env.DB_URL, () => {
    console.log("Database Connected.!!");
});