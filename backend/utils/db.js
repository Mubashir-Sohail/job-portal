import mongoose from "mongoose";

const connectDB=async()=>{
  try{
   await mongoose.connect(process.env.MONGO_URI);
   console.log("MongoDB server is Connected Successfully")
  }catch(error){
   console.log("MongoDB server is not  Connected")
  }
}
export default connectDB