import express from "express";

import { deleteUser, login, signUp, updateUser } from "../controllers/Auth.js";

const router = express.Router();

// define your routes
router.post("/signUp",signUp)
router.post("/login",login)
router.put("/update",updateUser)
router.delete("/delete",deleteUser)
export default router;