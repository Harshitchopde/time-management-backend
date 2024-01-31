import Dates from "../models/Dates.js";
import User from "../models/User.js";


export const createDate = async (req, res, next) => {
    try {
        // const {name,roll} = req.body;
        
        console.log("run");
        const userId = req.user.id;
        const currentDate = new Date();

        // Extract year, month, and day components
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        
        // Create the formatted date string
        const formattedDate = `${year}-${month}-${day}`;
         const findDate = await Dates.findOne({ date: formattedDate ,userId:userId});
        if (findDate) {
            return res.status(400).json({
                success: false,
                message: "Date already created",
            })
        }
        const dateCreate = await Dates.create({ date: formattedDate ,userId});
        console.log(dateCreate);
        // add this date to the user
        await User.findByIdAndUpdate(userId, {
                                 $push: { Dates: dateCreate._id },
                                 }, { new: true })
        return res.status(200).json(
            {
                status: 200,
                message: `Date-${formattedDate} created OKK`,
                dateCreate,
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

export const getDateDetails = async (req, res, next) => {
    try {
       
        const userId = req.user.id;
        const currentDate = new Date();

        // Extract year, month, and day components
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        
        // Create the formatted date string
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
                message: `Date-${formattedDate} created OKK`
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
