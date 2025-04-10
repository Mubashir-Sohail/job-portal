import {Application} from "../models/application.model.js"
import {Job} from "../models/job.model.js"

export const applyJob =async(req, res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;

        if(!jobId){
            return res.status(400).json({
                message:"job id is required",
                success:false
            })
        }
        // check the user has already applied for the job
        const existingApp =await Application.findOne({job:jobId, applicant:userId});
        if(existingApp){
            return res.status(400).json({
                message:"You have already applied for this jobs",
                success:false
            });
        }
        //check if the job exists
        const job =await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        // create a new application // apply the job
        const newApplication =await Application.create({
            job:jobId,
            applicant:userId
        })
        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
// all applied jobs getting in one side(yani jin ma mana apply kiya tha sari jobs ki details )
export const getAppliedJobs =async(req,res)=>{
    try {
    const userId =req.id;
    const application=await Application.find({applicant:userId}).sort({createAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}}
        }
    })
    if(!application){
        return res.status(404).json({
            message:"No Appliation",
            success:false
        })

    }
    return res.status(200).json({
        application,
        success:true
    })
    } catch (error) {
        console.log(error);
        
    }
}
// (as aAdmin ) ais ma ham check kar tha ha kitna students/users na apply kiya ha
export const getApplicants =async(req,res)=>{
    try {
        const jobId =req.params.id;
        const job =await Job.findById(jobId).populate({
            path:'application',
            options:{sort:{createAt:-1}},
            populate:{
                path:'applicant'
            }

        })
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:"false"
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
// users(applicant) rejected & seleted:
export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        console.log(status)
        if(!status){
        return res.status(400).json({
            message:'status is required',
            success:false
        })
        }
        // find the application by application id
        console.log(applicationId);
        
        const application=await Application.findOne({ _id: applicationId });
        console.log(applicationId);
        console.log(application);
        console.log("Query: ", { _id: applicationId });
        console.log("Type of applicationId:", typeof applicationId);
console.log("Length of applicationId:", applicationId.length);

        
        if(!application){
            return res.status(404).json({
                message:"Application not Found.",
                status:false
            })
        }
        // update the status:
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status Updated successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
        
    }
}
