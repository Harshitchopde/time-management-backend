import express from "express";
import 'dotenv/config' //  to load the data to `process` variable
import { Connect } from "./config/connection.js";
import authRoutes from "./routes/authRoutes.js"
import datesRoutes from "./routes/datesRoutes.js"
import scheduleRoutes from "./routes/scheduleRoutes.js"
import actualRoutes from "./routes/actualRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json())// parser to use json
const PORT = process.env.PORT || 4000


app.use('/api/auth',authRoutes)
app.use('/api/date',datesRoutes)
app.use('/api/schedule',scheduleRoutes)
app.use("/api/actual",actualRoutes)
// default path
app.use('/',(req,res)=>{
    res.send("<H1> NAMASTE </H1>")
})


app.listen(PORT, () => {
    Connect()
    console.log(`Connected to server -> http:localhost:${PORT}/`);

})