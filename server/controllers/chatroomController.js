const Chatroom = require("../models/Chatroom");
const { mongoose } = require("mongoose");

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
        chatroom,
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

exports.checkRoomExist = async (req, res) => {
    const chatRoomId = req.params.chatroomId;
    if(chatRoomId.length !== 24) {
        return res.json({
            success: false
        })
    }
    const chatroom = await Chatroom.findOne({_id: chatRoomId});
    if (chatroom) {
        return res.json({
            chatroom,
            success: true
        });
    }
    return res.json({
        success: false
    });
}