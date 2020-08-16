const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/serverAuth");

router.post("/", auth.verifyToken, catchErrors(chatroomController.createChatroom));

router.get("/", auth.verifyToken, catchErrors(chatroomController.getAllChatrooms));

module.exports = router;