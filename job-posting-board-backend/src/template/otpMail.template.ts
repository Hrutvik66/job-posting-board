interface otpData {
  otp: string;
  company_name: string;
  context_message?: string;
}

const otp_template = (data: otpData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #555555;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
                margin: 20px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Notification</h1>
            <p>Dear Recruiter,</p>
            <p>
                ${data.context_message} To complete your action, please use the OTP below:
            </p>
            <div class="otp">Your OTP: ${data.otp}</div>
            <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,<br>The ${data.company_name} Team</p>
        </div>
        <div class="footer">
            <p>This email was sent to you because you requested an action on our website.</p>
        </div>
    </body>
    </html>

    `;
};


export default otp_template;