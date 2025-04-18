import express from "express";
import { protectRoute } from "../miidleware/auth.middleware.js";
import { getMessages, sendMessage, getUsersForSidebar } from "../controllers/message.controller.js";


const router = express.Router();

//router for sidebar users name, 
//we need to check if the user is logged in and then show his contacts in sidebar 
router.get("/users", protectRoute, getUsersForSidebar)

// router to get all the messages of a chat
// getting id of a user dynamically
router.get("/:id", protectRoute, getMessages);

//endpoint router to post to send message
router.post("/send/:id", protectRoute, sendMessage);

export default router;