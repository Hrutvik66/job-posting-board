// job model
import jobModel from "../model/Jobs";

// job mail template
import mail_template from "../template/jobMail.template";
// send email
import send_mail from "../utils/mail";
import companyService from "./company.service";

interface createJob {
  title: string;
  description: string;
  experienceLevel: string;
  candidates: Array<string>;
  endDate: Date;
  id:string;
}

class JobService {
  // create job
  async createJob(data: createJob) {
    try {
      // get company
      const company = await companyService.getCompanyById(data.id);
      if (!company) {
        throw new Error("Company not found.");
      }
      
      const newJob = await jobModel.create(data);
      // send mail notification to each candidate
      for (const candidate of data.candidates) {
        const mailOptions = {
          from: process.env.USER_EMAIL,
          to: candidate,
          subject: "Join Us: We're Hiring",
          html: mail_template({
            name: company.name,
            job_title: data.title,
            job_description: data.description,
            company_name: company.company_name,
            company_email: company.company_email,
          }),
        };
        const info = await send_mail(mailOptions);
      }

      // return the created job
      return newJob;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create job.");
    }
  }

  //   get all the jobs of specified company
  async getAllJobsOfCompany(_id: string) {
    try {
      const jobs = await jobModel.find({ _id });
      return jobs;
    } catch (error) {
      throw new Error("Failed to get all jobs.");
    }
  }
}

export default new JobService();
