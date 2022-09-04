const mongoose = require("mongoose");
// const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";
const dbName = "task-manager-api";
const dbURL = `mongodb+srv://user:user@cluster0.zawyuz7.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURL);