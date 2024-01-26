import Dates from "../models/Dates.js";
import Schedule from "../models/Schedule.js";

export const createSchedule =async (req,res,next)=>{
    try {
        // get the parameter form body
        const {startTime,endTime,taskName} = req.body;

        // check is not empty
        if(!startTime || !endTime || !taskName){
            return res.status(200).json({
                success:false,
                message:"All field is required",
            })
        }
        // createSchedule
        const schedule = await Schedule.create({startTime,endTime,taskName});
        // store its id in date   const currentDate = new Date();
        const currentDate = new Date();
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const dates = await Dates.findOneAndUpdate({date:currentDateWithoutTime},
                                      {
                                        $push:{Schedule:schedule._id}
                                      },{new:true})
        
     
    
        res.status(200).send(
           { status:200,
            schedule,
            dates,
            
            message:"Created Schedule"}
        )
        
    
    } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        }
        )

    }
}
export const getSingleSchedule = async(req,res,next)=>{
    try {
        const scheduleId = req.params.scheduleId;
        if(!scheduleId){
            return res.status(400).json({
                success:false,
                message:"ScheduleId is empty"
            })
        }
        const schedule = await Schedule.findById(scheduleId);
        return res.status(200).json({
            success:true,
            message:"Get successfully",
            schedule,
        })
    } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const updateSchedule =async (req,res,next)=>{
    try {
       const scheduleId = req.params.scheduleId;

      
        // createSchedule
        const schedule = await Schedule.findByIdAndUpdate({_id:scheduleId},{ $set:req.body},{new:true})
        res.status(200).send(
           { status:200,
            message:"Updated Schedule",
            schedule,}
        )
        
    
    } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        }
        )

    }
}
export const deleteSchedule =async (req,res,next)=>{
    try {
       const scheduleId = req.params.scheduleId;
      
        // createSchedule
        const schedule = await Schedule.findByIdAndDelete(scheduleId)
        const currentDate = new Date();
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const dates = await Dates.findOneAndUpdate({date:currentDateWithoutTime},
                                      {
                                        $pull:{Schedule:scheduleId}
                                      },{new:true})
        
        res.status(200).send(
           { status:200,
            message:"Deleted successfully Schedule",   
            schedule,
        }
        )
        
    
    } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        }
        )

    }
}
