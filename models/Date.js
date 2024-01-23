import mongoose from "mongoose";

const datesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    roll:{
        type:Number,
        required:true,
        
    }
})
export default mongoose.model("Date",datesSchema);