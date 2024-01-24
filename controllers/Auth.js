// import Demo from "../models/Demo.js";
import bcrypt from "bcrypt"
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
// sigin up 
export const signUp = async (req, res, next) => {
    try {
        const { firstName, lastName, password, email, confromPassword } = req.body;

        // checks all fields 
        if (!firstName || !lastName || !password || !email || !confromPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }
        // check user already exist 
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }
        // match password
        if (password !== confromPassword){
            return res.status(400).json({
                success: false,
                message: "password not match"
            })
        }
        // encript password  
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        // create entry
        const user = await User({
            firstName:firstName,
            lastName:lastName,
            password: hashPassword,
            email,
        })
        const saveUser = await user.save();
        // return response 


        res.status(200).json(
            {
                status: 200,
                message: "user created successfully",
                saveUser,
            })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        }
        )


    }
}



// login in
export const login = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        // checks all fields 
        if (!password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }
        // check user already exist 
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Does not exist"
            })
        }
        // check password 
        const isTruePassword = bcrypt.compareSync(password, checkUser.password);
        if (!isTruePassword) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password!"
            })
        }
        const payload = {
            password,
            email
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);



        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(
            {
                status: 200,
                message: "User successfully login",

            })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        }
        )


    }
}

// log out -> future