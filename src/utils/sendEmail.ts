const nodemailer = require("nodemailer");

export const sendEmail = async (props:{to:string,subject:string,html:string}): Promise<void> => {
  const {to,subject,html} = props
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user:  process.env.EMAIL_USER,
      pass:  process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to:to,
    subject:subject,
    html:html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
