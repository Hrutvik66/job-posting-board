import otpModel from "../model/OTP";
// express
import { Request, Response } from "express";
// company service
import otpService from "../service/otp.service";

class OTPController {
  // generate otp for company login
  async generateOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const response = await otpService.generateOtp(email);
      if (!response) {
        throw new Error("Failed to send OTP. Please try again later.");
      }

      res.status(200).json({ message: "OTP sent successfully." });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }

  //   sendOTP
  async sendOtp(req: Request, res: Response) {
    try {
      const { email, company_name } = req.body;

      const response = await otpService.sendOtp(email, company_name);
      if (!response) {
        throw new Error("Failed to send OTP. Please try again later.");
      }

      res.status(200).json({ message: "OTP sent successfully." });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }

  //   verify otp
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      // check if otp exists in database
      // Find the most recent OTP for the email
      const response = await otpModel
        .find({ email })
        .sort({ createdAt: -1 })
        .limit(1);
      if (response.length === 0 || otp !== response[0].otp) {
        throw new Error("Invalid OTP.");
      }

      res.status(200).json({ message: "OTP verified successfully." });
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  }
}

export default new OTPController();
