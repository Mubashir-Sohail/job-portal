import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";


const providerRoute =express.Router();

providerRoute.route("/register").post(isAuthentication,registerCompany);
providerRoute.route("/get").get(isAuthentication,getCompany);
providerRoute.route("/get/:id").get(isAuthentication,getCompanyById);
providerRoute.route("/update/:id").put(isAuthentication,updateCompany);

export default providerRoute