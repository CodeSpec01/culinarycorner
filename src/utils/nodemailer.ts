import nodemailer from "nodemailer";

const email = process.env.EMAIL_ID; 

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: process.env.EMAIl_PASSWORD,
  },
});

export const mailOptions = {
    from: email,
}