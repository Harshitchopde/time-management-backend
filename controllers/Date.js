import Dates from "../models/Dates.js";
import User from "../models/User.js";


export const createDate = async (req, res, next) => {
    try {
        // const {name,roll} = req.body;
        
        console.log("run");
        const userId = req.user.id;
        const date = req.body.date;
        const findDate = await Dates.findOne({ date: date ,userId:userId});
        if (findDate) {
            return res.status(400).json({
                success: false,
                message: "Date already created",
            })
        }
        const dateCreate = await Dates.create({ date: date ,userId});
        // console.log(dateCreate);
        // add this date to the user
        await User.findByIdAndUpdate(userId, {
                                 $push: { Dates: dateCreate._id },
                                 }, { new: true })
        return res.status(200).json(
            {
                status: 200,
                message: `Date-${date} created OKK`,
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
        const date = req.body.date;
         const findDate = await Dates.findOne({ date: date,userId }).populate("Schedule")
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
                message: `Date-${date} created OKK`
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
