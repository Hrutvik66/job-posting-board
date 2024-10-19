import { Router } from "express";
// controller
import jobController from "../controller/job.controller";

const jobRouter = Router();

// create job route
jobRouter.post("/", jobController.createJob);
// get all jobs of specified company route
jobRouter.get("/company/:_id", jobController.getAllJobsOfCompany);

export default jobRouter;