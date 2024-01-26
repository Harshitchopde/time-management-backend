import express from "express";
import { createDate, getDateDetails } from "../controllers/Date.js";
import { verifyToken } from "../middlewares/verifyUser.js";

// import { createStudent }  from "../controllers/demo.js";

const router = express.Router();

// define your routes

// Create date
router.post("/createDate",verifyToken, createDate)
// GEt details 
router.get("/getDateDetails",getDateDetails)
// Update date
// router.post("/updateDate",)

// delete date -> future use



export default router;