import mongoose from "mongoose";

const dateSchema = mongoose.Schema({
    date:{
        type:Date, 
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    Schedule:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Schedule",
        // required:true,
        
    }],
    Actual:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Actual",
        // required:true,
        
    }],
    OtherFactor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OtherFactor",
       
        
    },
  

},{timestamps:true})
export default mongoose.model("Dates",dateSchema);