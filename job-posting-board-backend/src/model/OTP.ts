import mongoose from "mongoose";
import { Schema } from "mongoose";
// send_mail
import send_mail from "../utils/mail";
// template otp
import otp_template from "../template/otpMail.template";

const otpSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const sendVerificationEmail = async (
  email: string,
  company_name: string,
  otp: string
) => {
  try {
    const options = {
      from: "Cuvette", // sender address
      to: email, // receiver email
      subject: "OTP Login to Cuvette Job portal", // Subject line
      html: otp_template({
        otp,
        company_name: company_name,
        context_message:
          "Your login/registration attempt requires verification. Please enter the OTP to proceed.",
      }),
    };

    const mailResponse = await send_mail(options);
  } catch (error) {
    throw error;
  }
};

otpSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.company_name, this.otp);
  }
  next();
});

const otpModel = mongoose.model("otpModel", otpSchema);

export default otpModel;
