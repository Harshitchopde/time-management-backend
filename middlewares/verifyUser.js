import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("verify run ")
    try {

        if (!token) {
            return res.status(400).json(
                {
                    status: false,
                
                    message: "no token"
                }
            )
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json(
                    {
                        status: false,
                     
                        message: err.message,
                    }
                )
            }
            req.user = user // i don under stand this line why used
            console.log("verifyed");
            next()

        });


    } catch (error) {
        console.log(error)
        next(error)
    }
};