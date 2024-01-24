import express from "express";
import 'dotenv/config' //  to load the data to `process` variable
import { Connect } from "./config/connection.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();


app.use(express.json())// parser to use json
const PORT = process.env.PORT || 4000


app.use('/api/auth',authRoutes)
// default path
app.use('/',(req,res)=>{
    res.send("<H1> NAMASTE </H1>")
})


app.listen(PORT, () => {
    Connect()
    console.log("Connected to server");

})