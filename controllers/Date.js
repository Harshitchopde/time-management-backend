import Dates from "../models/Dates.js";
import User from "../models/User.js";


export const createDate = async (req, res, next) => {
    try {
        // const {name,roll} = req.body;
        console.log("run");
        const userId = req.user.id;
        const currentDate = new Date();
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        console.log(currentDateWithoutTime);
         const findDate = await Dates.findOne({ date: currentDateWithoutTime });
        if (findDate) {
            return res.status(400).json({
                success: false,
                message: "Date already created",
            })
        }
        const dateCreate = await Dates.create({ date: currentDateWithoutTime });
        console.log(dateCreate);
        // add this date to the user
        await User.findByIdAndUpdate(userId, {
                                 $push: { Dates: dateCreate._id },
                                 }, { new: true })
        return res.status(200).send(
            {
                status: 200,
                dateCreate,
                message: `Date-${currentDateWithoutTime} created OKK`
            }
        )


    } catch (error) {
        console.log(error);
        res.status(400).send(
            {
                success: false,
                message: error.message,
            })

    }
}
export const getDateDetails = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
       
         const findDate = await Dates.findOne({ date: currentDateWithoutTime }).populate("Schedule")
                                                                                .populate("Actual")
        if (!findDate) {
            return res.status(400).json({
                success: false,
                message: "Date Not found!",
            })
        }
        return res.status(200).send(
            {
                success: true,
                date:findDate,
                message: `Date-${currentDateWithoutTime} created OKK`
            }
        )


    } catch (error) {
        console.log(error);
        res.status(400).send(
            {
                success: false,
                message: error.message,
            })

    }
}
