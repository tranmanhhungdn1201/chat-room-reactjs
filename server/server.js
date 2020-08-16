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

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const jwt = require("jsonwebtoken");
const User = require("./models/User");
const io = require('socket.io')(server);
const { SECRET_KEY } = process.env;

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        jwt.verify(token, SECRET_KEY, (err, decodedData) => {
            User.findById(decodedData._id, (err, user) => {
                next();
                socket.userId = user._id;
            });
        });
    } catch (error) {
        console.log(error);
    }
})

io.on('connection', (socket) => {
    console.log('Connected: ' + socket.userId);
    socket.on('disconnect', () => {
        console.log(socket.id + ": disconnected");
    });
})