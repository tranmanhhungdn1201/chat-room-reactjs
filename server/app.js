const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//Bring in the routes
const userRoute = require("./routes/user");
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