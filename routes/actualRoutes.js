import express from "express";
import { createActual, deleteActual, getSingleActual, updateActual } from "../controllers/Actual.js";
import { verifyToken } from "../middlewares/verifyUser.js";


const router = express.Router();

router.post("/createActual",verifyToken,createActual);
router.get("/find",verifyToken,getSingleActual);
router.put("/:ActualId",verifyToken,updateActual);
router.delete("/:ActualId",verifyToken,deleteActual);
export default router;