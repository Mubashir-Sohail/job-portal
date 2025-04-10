import React, { useState } from "react";
import { Input } from "../../input";
import { Button } from "../../button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const SignUp = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phoneNumber:"",
    password: "",
    
    role: "student",
    file: "",
  });
  const navigate=useNavigate();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      const res=await axios.post(`${USER_API_END_POINT}/register`, formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      })
      if(res.data.success){
        navigate("/Login")
        toast.success(res.data.message,{
          style: {
            backgroundColor:"white",
            border: "2px solid #54CBD0", // Border with custom color
            // backgroundColor: "#54CBD0",  // Background color
            color: "#54CBD0",               // Text color for better contrast
            padding: "10px",             // Optional: Padding for better appearance
            borderRadius: "5px",         // Optional: Rounded corners
          }, // Green success background
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message,{
        style: {
          backgroundColor:"white",
          border: "2px solid rgb(249, 0, 0)", // Border with custom color
          // backgroundColor: "#54CBD0",  // Background color
          color: "rgb(249, 0, 0)",               // Text color for better contrast
          padding: "10px",             // Optional: Padding for better appearance
          borderRadius: "5px",         // Optional: Rounded corners
        }, // Green success background
      });;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-sm border border-gray-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">
            Sign <span className="text-[#54CBD0]">Up</span>
          </h1>
          <div className="my-4">
            <label>Full Name</label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Your Name"
              className="border border-gray-300 hover:border-black focus:border-black w-full"
            />
          </div>
          <div className="my-4">
            <label>Email</label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter Your Email"
              className="border border-gray-300 hover:border-black focus:border-black w-full"
            />
          </div>
          <div className="my-4">
            <label>PhoneNumber</label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="xxxx-xxxxxxx"
              className="border border-gray-300 hover:border-black focus:border-black w-full rounded-lg"
            />
          </div>
          
          <div className="my-4">
            <label>Password</label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
              className="border border-gray-300 hover:border-black focus:border-black w-full rounded-lg"
            />
          </div>
          <div className="flex my-5">
            <div
              className={`flex items-center space-x-2 ${
                input.role === "student" ? "text-black" : "text-[#B2B2B2]"
              }`}
            >
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  input.role === "student"
                    ? "border-[#54CBD0] bg-[#54CBD0]"
                    : "border-gray-300"
                }`}
                onClick={() => setinput({ ...input, role: "student" })}
              ></div>
              <label htmlFor="student" className="cursor-pointer">
                Student
              </label>
            </div>

            <div
              className={`flex items-center space-x-2 ${
                input.role === "recruiter" ? "text-black" : "text-[#B2B2B2]"
              }`}
            >
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  input.role === "recruiter"
                    ? "border-[#54CBD0] bg-[#54CBD0]"
                    : "border-gray-300"
                }`}
                onClick={() => setinput({ ...input, role: "recruiter" })}
              ></div>
              <label htmlFor="recruiter" className="cursor-pointer">
                Recruiter
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 my-5">
            <label className="pt-2">Profile</label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer rounded-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#54CBD0] text-lg mt-5"
          >
            SignUp
          </Button>
          <div className="mt-2 mb-5 text-sm">
            Already have an account?{" "}
            <Link to="/Login" className="text-[#399FA3]">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
