import dotenv from "dotenv";
import path from "path";
import express from "express";
import app from "./app.js";
import { server } from "./lib/socket.js"
import { connectDB } from "./lib/db.js";

dotenv.config();                    // lets us load content of dotenv

const PORT = process.env.PORT;
const __dirname = path.resolve();

//through this we're serving frontend and backend to same server
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log("server is running on " +PORT);
    connectDB();
});

