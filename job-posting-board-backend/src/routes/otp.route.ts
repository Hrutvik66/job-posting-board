// express router
import { Router } from "express";
// otp controller
import OTPController from "../controller/otp.controller";

const otpRouter = Router();

// generate otp route
otpRouter.post("/generate", OTPController.generateOtp);
// send otp route
otpRouter.post("/send", OTPController.sendOtp);
// verify otp route
otpRouter.post("/verify", OTPController.verifyOtp);

export default otpRouter;