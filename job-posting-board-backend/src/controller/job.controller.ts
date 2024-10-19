import { Request, Response } from "express";
// service
import jobService from "../service/job.service";

class JobController {
  // create job
  async createJob(req: Request, res: Response) {
    try {
      const data = req.body;

      const job = await jobService.createJob(data);
      res.status(201).json({ message: "Job created successfully.", job });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }
  // get all jobs of specified company
  async getAllJobsOfCompany(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      const jobs = await jobService.getAllJobsOfCompany(_id);
      res.status(200).json({ message: "Jobs retrieved successfully.", jobs });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }
}

export default new JobController();
