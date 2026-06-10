import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { identifyServer } from "./miidleware/serverIdentity.middleware.js";

const app = express();

app.use(identifyServer);
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4000", "http://localhost:5001", "http://localhost"],
    credentials: true
}));

// extract the json data from body of request
// Increase payload limit (to fix 413 error)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// route for authorization
app.use("/api/auth", authRoutes);

// route for messages
app.use("/api/messages", messageRoutes);

app.get('/users', (req, res) => {
  res.json([{ name: 'John Doe' }]);
});

export default app;
