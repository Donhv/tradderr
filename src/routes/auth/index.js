import express from "express";
import signUp from "./signup";
import register from "./register";
import login from "./login";
import verifyOtp from "./verifyOtp";

const router = express.Router();

router.post("/signup", signUp);
router.post("/register", register);
router.post("/login", login);
router.post("/verifyOtp", verifyOtp);

export default router;