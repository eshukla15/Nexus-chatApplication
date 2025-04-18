import { v2 as cloudinary } from "cloudinary";
//provides a bucket for images
import {config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    secret_key: process.env.CLOUDINARY_SECRET_KEY
});


export default cloudinary

