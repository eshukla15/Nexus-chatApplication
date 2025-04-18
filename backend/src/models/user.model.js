import mongoose from "mongoose";

// creating schema (blueprint) of user
const userSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true 
    }
);

// creating a model (using thatvblueprint)
const User = mongoose.model("User", userSchema);

// to fill details in model(User)
export default User;
