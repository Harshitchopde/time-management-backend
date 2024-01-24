import express from "express";

import { login, signUp } from "../controllers/Auth.js";

const router = express.Router();

// define your routes
router.post("/signUp",signUp)
router.post("/login",login)
export default router;