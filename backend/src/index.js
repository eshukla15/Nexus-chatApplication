//const express = require("express")  //importing express library
import express from "express";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"
import { connectDB } from "./lib/db.js";

dotenv.config();                    // lets us load content of dotenv

const PORT = process.env.PORT;

// extract the json the data from body of request
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// route for authorization
app.use("/api/auth", authRoutes);

//route for messages
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log("server is running on " +PORT);
    connectDB();
});

