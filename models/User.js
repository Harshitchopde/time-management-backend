import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        // required:true,
    },
    password:{
        required:true,
        type:String,
      
    },
    email:{
        required:true,
        type:String,
        trim:true,
    },
    Dates:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Dates",
        }
    ]
 
},{timestamps:true})
export default mongoose.model("User",userSchema);