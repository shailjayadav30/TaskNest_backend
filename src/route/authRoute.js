import express from "express";
import { signin, signUp } from "../controller/Auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin",signin)

export default router;
