const Chatroom = require("../models/Chatroom");

exports.createChatroom = async (req, res) => {
    const  { name } = req.body;

    const chatroomExists = await Chatroom.findOne({ name });
    if (chatroomExists) {
        return res.json({
            success: false,
            message: "Chatroom is exist",
        });
    }

    const chatroom = new Chatroom({
        name,
    });
    await chatroom.save();

    return res.json({
        success: true,
        message: "Chatroom created!",
    });
}

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find();

    return res.json({
        success: true,
        data: chatrooms
    })
}