import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import config from "#src/config.js";

export default {
  sendMail,
  sendMailSync,
  sendWithOtpTemplate,
};

const transporter = nodemailer.createTransport({
  host: config.mailer.host || "smtp.gmail.com",
  port: config.mailer.port || 465,
  secure: true,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass,
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

async function sendMailSync(
  receiver,
  subject,
  templateName,
  context
  // attachments
) {
  if (typeof receiver === "string") {
    receiver = [receiver];
  }

  transporter.use("compile", hbs(handlebarOptions));
  return await transporter.sendMail({
    from: config.mailer.user,
    to: receiver,
    subject,
    template: templateName,
    context,
    // attachments,
  });
}

function sendMail(receiver, subject, text) {
  if (typeof receiver === "string") {
    receiver = [receiver];
  }

  return transporter.sendMail({
    from: config.mailer.user,
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
    otpCode: otp,
  });
}
