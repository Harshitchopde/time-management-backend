import Dates from "../models/Dates.js";
import Actual from "../models/Actual.js";

export const createActual =async (req,res,next)=>{
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
        // createActual
        
        const actual = await Actual.create({startTime,endTime,taskName});
        // store its id in date   const currentDate = new Date();
        const currentDate = new Date();
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const dates = await Dates.findOneAndUpdate({date:currentDateWithoutTime},
                                      {
                                        $push:{Actual:actual._id}
                                      },{new:true})
        
     
    
        res.status(200).send(
           { status:200,
            actual,
            dates,
            
            message:"Created Actual"}
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
export const getSingleActual = async(req,res,next)=>{
    try {
        const ActualId = req.params.ActualId;
        if(!ActualId){
            return res.status(400).json({
                success:false,
                message:"ActualId is empty"
            })
        }
        const actual = await Actual.findById(ActualId);
        return res.status(200).json({
            success:true,
            message:"Get successfully",
            actual,
        })
    } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const updateActual =async (req,res,next)=>{
    try {
       const ActualId = req.params.ActualId;

      const findActual = await Actual.findById(ActualId);
      if(!findActual){
        return res.status(400).json({
            success:false,
            message:"Does not found actual"
        })
      }
        // createActual
        const actual = await Actual.findByIdAndUpdate({_id:ActualId},{ $set:req.body},{new:true})
        res.status(200).send(
           { status:200,
            message:"Updated Actual",
            actual,}
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
export const deleteActual =async (req,res,next)=>{
    try {
       const ActualId = req.params.ActualId;
      
        // createActual
        const actual = await Actual.findByIdAndDelete(ActualId)
        const currentDate = new Date();
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const dates = await Dates.findOneAndUpdate({date:currentDateWithoutTime},
                                      {
                                        $pull:{Actual:ActualId}
                                      },{new:true})
        
        res.status(200).send(
           { status:200,
            message:"Deleted successfully Actual",   
            actual,
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