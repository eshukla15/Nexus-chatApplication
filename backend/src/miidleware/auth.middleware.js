import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        //if token is absent
        if (!token) {
            return res.status(401).json({message : "Unauthorized - no token provided"})
        }

        //if present, verify if its valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({message : "Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({message: "User Not Found"});
        }
        //now user is authenticated
        //this will be used in next function
        req.user = user

        //call next function
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({message : " internal server error"});
    }
};