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
const Message = require("./models/Message");
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
    console.log("connected: " + socket.id);
    socket.on('disconnect', () => {
        console.log(socket.id + ": disconnected");
    });

    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("A user joined chatroom: " + chatroomId);
    });

    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom: " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        if (message.trim().length > 0) {
            console.log("MESSAGE: " + message);
          const user = await User.findOne({ _id: socket.userId });
          const newMessage = new Message({
            chatroom: chatroomId,
            user: socket.userId,
            message,
          });
          io.to(chatroomId).emit("newMessage", {
            message,
            name: user.name,
            userId: socket.userId,
          });
          await newMessage.save();
        }
    });
})