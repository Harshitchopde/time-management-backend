import mongoose from "mongoose";

const subActualSchema = mongoose.Schema({
    startTime:{
        type:Date,
        required:true,
    },
    endTime:{
        type:Date,
        required:true,
    },
    taskName:{
        type:String,
        required:true,
        
    }
})
export default mongoose.model("SubActual",subActualSchema);