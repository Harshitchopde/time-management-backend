import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    console.log("veriging token start");
    
    const token = req.cookies.access_token;
    // access_token
    
    

    
    try {
        console.log("Dhek bhai");
        
        console.log(token);
        

        if (!token) {
            return res.status(400).json(
                {
                    status: false,
                
                    message: "no token"
                }
            )
        }
        console.log("hee");
        
        jwt.verify(token, process.env.JWT_SECRETS, (err, user) => {
            if (err) {
                return res.status(400).json(
                    {
                        status: false,
                     
                        message: err.message,
                    }
                )
            }
            req.user = user 
            // console.log(user);
            
           
            next()

        });


    } catch (error) {
        console.log("VerifyUser"+error)
        next(error)
    }
};
export const verifyAuth = (req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User is not present"
            })
        }
        return res.status(200).json({
            success:true,
            message:"User is authernticated"
        })
        
    } catch (error) {
        console.log("verifyAuth"+error)
       return res.status(400).json({
        success:false,
        message:error.message,
       })
    }
}