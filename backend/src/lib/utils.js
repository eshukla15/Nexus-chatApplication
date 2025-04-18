import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

    // generating a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // sending token via cookie
    // sets a cookie in user's browser, name jwt
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // miliseconds 7days
        httpOnly : true, //prevents XSS attacks cross site scripting
        sameSite : "strict", // CSRF attack cross site request foregery attack
        secure: process.env.NODE_ENV !== "development",
    });
}