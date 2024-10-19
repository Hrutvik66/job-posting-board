
interface mailData{
    name: string;
    job_title: string;
    job_description: string;
    company_name: string;
    company_email: string;
}

const mail_template = (data:mailData) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Offer</title>
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
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <p>Greetings,</p>
            <p>
                We are excited to inform you about a job opportunity for the position of 
                <strong>${data.job_title}</strong> at <strong>${data.company_name}</strong>.
            </p>
            <p>
                Here are the details of the job:
            </p>
            <p>
                <strong>Job Description:</strong><br>
                ${data.job_description}
            </p>
            <p>
                If you are interested, please reply to this email or contact us at 
                <strong>${data.company_email}</strong>. 
            </p>
            <p>
                Best regards,<br>
                ${data.name}<br>
                ${data.company_name}
            </p>
        </div>
        <div class="footer">
            <p>This email was sent to you because you applied for a position with us.</p>
        </div>
    </body>
    </html>
    `;
};

export default mail_template;
