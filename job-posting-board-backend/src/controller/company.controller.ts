import { Request, Response } from "express";
// company service
import companyService from "../service/company.service";
// auth
import { CustomRequest, CustomJwtPayload } from "../middleware/auth.middleware";

class CompanyController {
  // register company
  async registerCompany(req: Request, res: Response) {
    try {
      const data = req.body;

      const { newCompany, token } = await companyService.registerCompany(data);
      res
        .status(201)
        .json({
          message: "Company registered successfully.",
          company: newCompany,
          token,
        });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }

  // login company
  async loginCompany(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const { company, token } = await companyService.loginCompany(email, otp);
      if (!token) {
        throw new Error("Failed to login. Invalid OTP.");
      }

      res.status(200).json({ message: "Login successful.", company, token });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }
  //   get company by id
  async getCompanyById(req: Request, res: Response) {
    try {
      let { id } = (req as CustomRequest).token as CustomJwtPayload;

      const company = await companyService.getCompanyById(id);
      res
        .status(200)
        .json({ message: "Company retrieved successfully.", company });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }
}

export default new CompanyController();
