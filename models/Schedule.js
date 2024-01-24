import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
   subSchedule:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSchedule",
    required:true,
   }]
})
export default mongoose.model("Schedule",scheduleSchema);