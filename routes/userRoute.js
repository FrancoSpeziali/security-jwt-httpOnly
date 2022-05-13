import express from "express";
const router = express.Router();
import { login, profile, register } from "../controllers/user.js";

router.post("/login", login);

router.get("/profile", profile);

router.post("/register", register);

export default router;
