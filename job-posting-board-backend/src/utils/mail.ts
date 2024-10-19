import nodemailer from "nodemailer";

// creating reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const send_mail = async (mailDetails: object) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    return info;
  } catch (error) {
    throw error;
  }
};

export default send_mail;
