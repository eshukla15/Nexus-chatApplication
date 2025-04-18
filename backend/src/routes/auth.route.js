// route file for authentication

import express from "express";  // ecmaScript module
import { login, logout, signup, updateProfile, checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../miidleware/auth.middleware.js";

const router = express.Router() // creates a mini Express application that handles routes separately.

router.post("/signup", signup );
router.post("/login", login );
router.post("/logout", logout );

//to update profile, first check if the user is logged in(authenticated)
//it's a middleware
router.put("/update-profile", protectRoute, updateProfile);

//check if the user is already logged in
router.get("/check", protectRoute, checkAuth);

export default router;
