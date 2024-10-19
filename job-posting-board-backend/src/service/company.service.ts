// model
import companyModel from "../model/Company";
// dto
import { createCompany } from "../dto/company.dto";
// otpService
import otpService from "../service/otp.service";
// jwt
import jwt, { Secret } from "jsonwebtoken";

const { verifyOtp } = otpService;

class CompanyService {
  // create company
  SECRET_KEY: Secret = process.env.SECRET_KEY!;
  async registerCompany(data: createCompany) {
    try {
      // check if company already exists
      const existingCompany = await companyModel.findOne({
        company_email: data.company_email,
      });
      if (existingCompany) {
        throw new Error("Company already exists.");
      }

      const newCompany = await companyModel.create(data);
      let token;
      if(newCompany){
        token = jwt.sign({ id: newCompany._id }, this.SECRET_KEY, {
          expiresIn: "7d",
        });
      }
      return {newCompany, token};
    } catch (error) {
      throw Error((error as any).message);
    }
  }

  // login company by sending otp to email address
  async loginCompany(email: string, otp: string) {
    try {
      // check if company exists
      const company = await companyModel.findOne({ company_email: email });
      if (!company) {
        throw new Error("Company not found.");
      }
      // send otp to email address
      const isValidOTP = await otpService.verifyOtp({ email, otp });
      let token: string | undefined;
      if (isValidOTP) {
        // create the token using JWT token
        token = jwt.sign({ id: company._id }, this.SECRET_KEY, {
          expiresIn: "7d",
        });
      }
      return { company, token: token };
    } catch (error) {
      throw Error((error as any).message);
    }
  }

  //   get company information by email address
  async getCompanyByEmail(email: string) {
    try {
      const company = await companyModel.findOne({ company_email: email });
      if (!company) {
        throw new Error("Company not found.");
      }
      return company;
    } catch (error) {
      throw Error((error as any).message);
    }
  }

  //   get company information by id
  async getCompanyById(id: string) {
    try {
      const company = await companyModel.findById(id);
      if (!company) {
        throw new Error("Company not found.");
      }
      return company;
    } catch (error) {
      throw Error((error as any).message);
    }
  }
}

export default new CompanyService();
