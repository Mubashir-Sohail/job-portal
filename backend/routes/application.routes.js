import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";


const providerRoute =express.Router();

providerRoute.route("/apply/:id").get(isAuthentication,applyJob);
providerRoute.route("/get").get(isAuthentication,getAppliedJobs);
providerRoute.route("/:id/applicants").get(isAuthentication,getApplicants);
providerRoute.route("/status/:id/update").post(isAuthentication,updateStatus);

export default providerRoute