import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controller/user.controller.js";
import IsAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.get("/profile" , IsAuthenticated, getUserProfile);

router.route("/logout").get(logout);
router.route("/profile/update" ).put(IsAuthenticated ,upload.single("profilePhoto"), updateProfile);


export default router ;   