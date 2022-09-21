const app = require("./index");




const port = process.env.PORT;

app.listen(port, (req, res) => {
    console.log("Server is Running on " + port);
});

