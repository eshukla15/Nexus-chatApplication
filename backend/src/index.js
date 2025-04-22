//const express = require("express")  //importing express library
import express from "express";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"
import { connectDB } from "./lib/db.js";
import path from "path";

dotenv.config();                    // lets us load content of dotenv

const PORT = process.env.PORT;
const __dirname = path.resolve();

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

//through this we're serving frontend and backend to same server
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
}));
}

server.listen(PORT, () => {
    console.log("server is running on " +PORT);
    connectDB();
});

