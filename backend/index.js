import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from"./routes/company.routes.js"
import jobRoute from"./routes/job.routes.js"
import applicationRoute from"./routes/application.routes.js"

dotenv.config()

const app=express();
const corsOption={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));

app.use((req, res, next) => {
    console.log("Incoming Headers:", req.headers);
    next();
});

//coverting json:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


// call api
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)





// port details:
const Port=process.env.PORT || 5004;
app.listen(Port ,()=>{
    connectDB();
    console.log(`Server is Running ${Port}`)
})