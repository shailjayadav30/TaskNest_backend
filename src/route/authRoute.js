import express from "express";
import { signUp } from "../controller/Auth.js";

const router = express.Router();

router.post("/signup", signUp);

export default router;
