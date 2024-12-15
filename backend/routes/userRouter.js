import express from "express";
import { login, logout, register } from "../controller/userController.js";

const router = express();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
