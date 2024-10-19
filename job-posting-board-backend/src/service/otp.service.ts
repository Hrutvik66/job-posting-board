import otpGenerator from "otp-generator";
import otpModel from "../model/OTP";
// company service
import companyService from "../service/company.service";

class OTPService {
  // generate otp for company login
  async generateOtp(email: string) {
    try {
      // check if company exists
      const company = await companyService.getCompanyByEmail(email);

      // generate OTP
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      let result = await otpModel.findOne({ otp: otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await otpModel.findOne({ otp: otp });
      }

      // save otp to database
      const res = await otpModel.create({
        company_name: company.company_name,
        email: company.company_email,
        otp: otp,
      });

      return res;
    } catch (error) {
      throw Error((error as any).message);
    }
  }

  // 
  async sendOtp(email: string, company_name:string) {
    try {
      // generate OTP
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      let result = await otpModel.findOne({ otp: otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await otpModel.findOne({ otp: otp });
      }

      // save otp to database
      const res = await otpModel.create({
        company_name: company_name,
        email: email,
        otp: otp,
      });

      return res;
    } catch (error) {
      throw Error((error as any).message);
    }
  }

  //   verify otp
  async verifyOtp(data: { email: string; otp: string }) {
    try {
      const { email, otp } = data;

      // check if otp exists in database
      // Find the most recent OTP for the email
      const response = await otpModel
        .find({ email })
        .sort({ createdAt: -1 })
        .limit(1);
      if (response.length === 0) {
        throw new Error("OTP is expired");
      }
      else if(otp !== response[0].otp){
        throw new Error("Invalid OTP.");
      }

      return true;
    } catch (error) {
      throw Error((error as any).message);
    }
  }
}

export default new OTPService();
