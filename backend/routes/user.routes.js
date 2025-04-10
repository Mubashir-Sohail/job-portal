import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthentication from "../middleware/isAuthentication.js";
import { singleUpload } from "../middleware/multer.js";


const providerRoute =express.Router();

providerRoute.route("/register").post(singleUpload,register);
providerRoute.route("/login").post(login);
providerRoute.route("/logout").get(logout);
providerRoute.route("/profile/update").post(isAuthentication,updateProfile);

export default providerRoute