import Dates from "../models/Dates.js";
import Schedule from "../models/Schedule.js";

const strToDate = (strTime)=>{
   
// Split the time string into hours, minutes, and AM/PM components
let [time, period] = strTime.split(' ');
let [hours, minutes] = time.split(':');

// Convert hours and minutes to numbers
hours = parseInt(hours, 10);
minutes = parseInt(minutes, 10);

// Adjust hours for PM if needed
if (period.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
}
let currentTime = new Date();
currentTime.setHours(hours,minutes,0,0);    
 
  return currentTime;
}
export const createSchedule =async (req,res,next)=>{
    try {
        // get the parameter form body
        const {startTime,endTime,taskName,date} = req.body;

        // check is not empty
        if(!startTime || !endTime || !taskName || !date){
            return res.status(200).json({
                success:false,
                message:"All field is required",
            })
        }
        const stTime = strToDate(startTime);
        const edTime = strToDate(endTime);
        console.log("ST : ",stTime);
        console.log("ED : ",edTime);
        // console.log(typeof stTime);
        
        
        

        // createSchedule
        const schedule = await Schedule.create({startTime:stTime,endTime:edTime,taskName});
    
           
           // Create the formatted date string
           
        const dates = await Dates.findOneAndUpdate({date:date},
                                      {
                                        $push:{Schedule:schedule._id}
                                      },{new:true})
        
     
    
        res.status(200).json(
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
        const userId = req.user.id;
        const dateString = req.query.date;
        // type to date
        const date = new Date(dateString);
        console.log(date);
        
        if(!date){
            return res.status(400).json({
                success:false,
                message:"date is empty"
            })
        }
        // !i write wong query
        const dateDate = await Dates.findOne({date,userId}).populate("Schedule").exec();
        const Schedule = dateDate.Schedule.map(s=>s.formattedSchedule);
        console.log(Schedule);
        
        
        return res.status(200).json({
            success:true,
            message:"Get successfully",
            Schedule,
        })
    } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: error.message,
            dk:"dfsd"
        })
    }
}
export const getParticularSchedule = async (req, res, next) => {
    try {
        const currentDate = new Date();

        // Extract year, month, and day components
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        
        // Create the formatted date stringmm
        const formattedDate = `${year}-${month}-${day}`;
       
         const findDate = await Dates.findOne({ date: formattedDate,userId }).populate("Schedule")
                                                                                .populate("Actual").exec();
        if (!findDate) {
            return res.status(400).json({
                success: false,
                message: "Date Not found!",
            })
        }
        return res.status(200).json(
            {
                success: true,
                date:findDate,
                message: `Date-${currentDateWithoutTime} created OKK`
            }
        )


    } catch (error) {
        console.log(error);
        res.status(400).json(
            {
                success: false,
                message: error.message,
            })

    }
}

export const updateSchedule =async (req,res,next)=>{
    try {
       const scheduleId = req.params.scheduleId;

      
        // createSchedule
        const schedule = await Schedule.findByIdAndUpdate({_id:scheduleId},{ $set:req.body},{new:true})
        res.status(200).json(
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
        
        res.status(200).json(
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
