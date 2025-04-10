import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register= async(req,res)=>{
    try{
    const {fullname, email, phoneNumber, password, role}=req.body
    if(!fullname || !email || !phoneNumber || !password || !role){
        return res.status(400).json({
            message:"Something is Missing",
            success:false
        });

    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:'User already exist with this email',
            success:false
        })
    }
    const hashedPassword= await bcrypt.hash(password, 8);

    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
    })
    return res.status(201).json({
        message:"Account created successfully",

        success:true
    })
    }catch(error){
     console.log(error);
     
    }
}

export const login =async (req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something id Missing",
                success:false
            });
        };
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect Email or Password",
                success:false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Some Field (Email & Password & Role)",
                success:false
            })
        }
        //check role is correct or not 
        if(role != user.role){
            return res.status(400).json({
                message:"Account doesnot exist with current role",
                success:false
            })
        }
        const tokenData ={
            userId:user._id
        }
        const token =await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge: 1*24*60*60*1000,httpsOnly: true, sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    }catch(error) {
     console.log(error);
    }
}

export const logout =async(req,res)=>{
    try{
     return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logged out is successfuly",
        success:true
     })

    }catch(error){
        console.log(error);

    }
}
export const updateProfile=async(req,res)=>{
    try{
    const {fullname, email, phoneNumber, bio, skills} = req.body;
    console.log("feild update",req.body)
    // const file=req.file;
    // cloudinary ayega idhar
    let skillsArray
    if(skills){
         skillsArray= skills.split(",");//toh yeh method strings ko todhne ke liye use hoti hai
    }
    const userId=req.id; // middleware authentication
    let user=await User.findById(userId);
    if(!user){
        return res.status(400).json({
            message:"user not found",
            success:false
        })
    }
    // updating data
    if(fullname) user.fullname=fullname
    if(email) user.email=email
    if(phoneNumber) user.phoneNumber=phoneNumber
    if(bio) user.profile.bio=bio
    if(skillsArray) user.profile.skills=skillsArray

    // resume comes later here.....

    await user.save();

    user ={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).json({
        message:"Profile update Successfully",
        user,
        success:true
    })
    }catch(error){
        console.log(error);
    }
}

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
//         console.log("Request Body:", req.body);
//         console.log("Uploaded File:", req.file);

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }

//         const userId = req.id; // Middleware Authentication
//         console.log("User ID from Middleware:", userId);

//         let user = await User.findById(userId);
//         if (!user) {
//             console.log("User Not Found for ID:", userId);
//             return res.status(400).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         console.log("Before Update:", user);

//         // Updating Data
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skillsArray) user.profile.skills = skillsArray;

//         console.log("After Update:", user);

//         await user.save().catch((error) => {
//             console.log("Save Error:", error.message);
//         });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile,
//         };

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user,
//             success: true,
//         });
//     } catch (error) {
//         console.log("Error:", error.message);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//         });
//     }
// };


// export const updateProfile = async (req,res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const userId = req.id; // Middleware Authentication
        
//         // Log for debugging
//         console.log("Request Body:", req.body);
//         console.log("User ID from Middleware:", userId);

//         // Find user
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         // Update user fields dynamically
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skills) user.profile.skills = skills.split(",");



        


//         // Save updated user
//         await user.save();

//         // Send response
//         console.log("Headers:", req.headers); // Check headers
//         console.log("Request Body:", req.body); // Check parsed body
//         console.log("Raw Body (if needed):", req.rawBody); // Check raw body (if middleware isn't working)
//         console.log("User ID:", req.id);

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user: {
//                 _id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 profile: user.profile,
//             },
//             success: true,
//         });

//     } catch (error) {
//         console.error("Error:", error.message);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//         });
//     }
// };
