const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Mongoose Connection");
});

db.once("open", () => {
    console.log("Mongoose Connected!")
})

//Bring in the models
require("./models/User");
require("./models/Message");
require("./models/Chatroom");

const app = require("./app");
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});