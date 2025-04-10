import jwt from "jsonwebtoken";

const isAuthentication =async(req ,res, next)=>{
try{
    console.log("Cookies:", req.cookies);

const token =req.cookies.token;
if(!token){
    return res.status(401).json({
        message:"user not authentication",
        success:false
    })
}
const decode =jwt.verify(token, process.env.SECRET_KEY);
console.log("Decoded Token:", decode);

if(!decode){
    return res.status(401).json({
        message:"Invalid token",
        success:false
    })
}
req.id=decode.userId;
console.log("userId is auth",req.id)
next();
}catch(error){
 console.log(error);
}

}

export default isAuthentication