import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  sendMail,
  sendWithOtpTemplate,
};

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST || "smtp.gmail.com",
  port: process.env.MAILER_PORT || 465,
  secure: true,
  auth: {
    user: process.env.MAILER_FROM,
    pass: process.env.MAILER_PASSWORD,
  },
});

const templateDir = path.resolve("public/mail-template");

const handlebarOptions = {
  viewEngine: {
    partialsDir: templateDir,
    defaultLayout: false,
  },
  viewPath: templateDir,
};

const sendMailSync = async (
  receiver,
  subject,
  templateName,
  context
  // attachments
) => {
  if (typeof receiver === "string") {
    receiver = [receiver];
  }

  transporter.use("compile", hbs(handlebarOptions));
  return transporter.sendMail({
    from: process.env.MAILER_FROM,
    to: receiver,
    subject,
    template: templateName,
    context,
    // attachments,
  });
};

async function sendMail(receiver, subject, text) {
  if (typeof receiver === "string") {
    receiver = [receiver];
  }

  return transporter.sendMail({
    from: process.env.MAILER_FROM,
    to: receiver,
    subject,
    template: null,
    text,
  });
}

async function sendWithOtpTemplate(receiver, otp, language = "en") {
  let subject;
  let templateName = "otp" + "." + language;
  if (language === "vi") {
    subject = `Mã xác minh của bạn là: ${otp}`;
  } else {
    subject = `Email verification code: ${otp}`;
  }

  return sendMailSync(receiver, subject, templateName, {
    logoHref: process.env.CLIENT_URL,
    otpCode: otp,
  });
}
