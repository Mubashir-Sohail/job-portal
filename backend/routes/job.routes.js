import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { getAdminJob, getAlljobs, getJobById, postJob } from "../controllers/job.controller.js";


const providerRoute =express.Router();

providerRoute.route("/post").post(isAuthentication,postJob);
providerRoute.route("/get").get(isAuthentication,getAlljobs);
providerRoute.route("/getadminjob").get(isAuthentication,getAdminJob);
providerRoute.route("/get/:id").get(isAuthentication,getJobById);

export default providerRoute