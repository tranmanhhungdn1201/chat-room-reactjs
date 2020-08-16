const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//Bring in the routes
const userRoute = require("./routes/user");
const chatroomRoute = require("./routes/chatroom");
app.use("/api/chatroom", chatroomRoute);
app.use("/api/users", userRoute);
//Setup Error Handlers
const errorHandlers = require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;