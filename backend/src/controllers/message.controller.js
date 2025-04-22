import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne:loggedInUserId}}).select("-password");
    
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForsidebar" , error.message);
        res.status(500).json({error : "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        //on whose chat we'll click, that id
        const { id: userToChatId } = req.params
        
        const myId= req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getmessages in message controllers.js", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const sendMessage = async (req, res) => {
    try {
        //text image to send
        const { text, image } = req.body;
        //other guy
        const { id: receiverId } = req.params;
        // me
        const senderId = req.user._id;

        //if user uploads an image
        let imageUrl;
        if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
        }

        //saving message in databse
        const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
        });

        //creating new message
        await newMessage.save();

        //socket io part
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};