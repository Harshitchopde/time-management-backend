import mongoose from "mongoose";

const actualSchema = mongoose.Schema({
   subSchedule:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubActual",
    required:true,
   }]
})
export default mongoose.model("Actual",actualSchema);