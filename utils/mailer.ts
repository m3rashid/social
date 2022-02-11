import { createTransport } from "nodemailer";
import { MailerData } from "../types/mailerData.types";
import log from "./logger";

// makign necessary configurations for the mailer
const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// generating the template for the mailer
const mail = async (email: string, data: MailerData) => {
  let html: string;
  if (data.otp) {
    html = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="font-family: sans-serif;">
      <h2>Hello user, Message from Social</h2>
      <p>${data.message}</p>
      <p>This is a one time OTP</p><h1>${data.otp}</h1>
    </body>
    </html>
    `;
  } else {
    html = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="font-family: sans-serif;">
      <h2>Hello user, Message from Social</h2>
      <p>${data.message}</p>
    </body>
    </html>
    `;
  }

  // making sending configurations for the mailer
  const info = await transporter.sendMail({
    from: `Social Admin <${process.env.GMAIL_USERNAME}@gmail.com>`,
    to: email,
    subject: data.subject,
    text: `${data.message} \n OTP: ${data.otp}`,
    html: html,
    priority: "high",
  });
  log.info(info);
};

export default mail;
