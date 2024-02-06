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
scheduleSchema.virtual('formattedSchedule').get(function() {
    const startTime= this.startTime.toLocaleTimeString('en-US', { hour: 'numeric',minute:'2-digit', hour12:true });
    const endTime= this.endTime.toLocaleTimeString('en-US', { hour: 'numeric',minute:'2-digit', hour12:true });
    return [startTime,endTime,this.taskName];
  });
  
// scheduleSchema.virtual('formattedEndTime').get(function() {
//     return this.endTime.toLocaleTimeString('en-US', { hour:  });
//   });
export default mongoose.model("Schedule",scheduleSchema);