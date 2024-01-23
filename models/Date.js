import mongoose from "mongoose";

const dateSchema = mongoose.Schema({
    date:{
        type:Date.now(), 
        required:true,
    },
    roll:{
        type:Number,
        required:true,
        
    }
})
export default mongoose.model("Date",dateSchema);