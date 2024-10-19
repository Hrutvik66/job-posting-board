"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express router
var express_1 = require("express");
// otp controller
var otp_controller_1 = __importDefault(require("../controller/otp.controller"));
var otpRouter = (0, express_1.Router)();
// generate otp route
otpRouter.post("/generate", otp_controller_1.default.generateOtp);
// send otp route
otpRouter.post("/send", otp_controller_1.default.sendOtp);
// verify otp route
otpRouter.post("/verify", otp_controller_1.default.verifyOtp);
exports.default = otpRouter;
