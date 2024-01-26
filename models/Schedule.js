import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
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
export default mongoose.model("Schedule",scheduleSchema);