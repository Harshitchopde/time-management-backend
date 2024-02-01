import express from "express";
import { createSchedule, deleteSchedule, getSingleSchedule, updateSchedule } from "../controllers/Schedule.js";
import { verifyToken } from "../middlewares/verifyUser.js";


const router = express.Router();

router.post("/createSchedule",verifyToken,createSchedule);
router.get("/:scheduleId",getSingleSchedule);
router.get("/")
router.put("/:scheduleId",verifyToken,updateSchedule);
router.delete("/:scheduleId",verifyToken,deleteSchedule);

export default router;