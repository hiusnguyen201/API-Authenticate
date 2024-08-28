import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import configs from "#src/configs.js";

export default {
  sendMail,
  sendWithOtpTemplate,
};

const transporter = nodemailer.createTransport({
  host: configs.mailer.host || "smtp.gmail.com",
  port: configs.mailer.port || 465,
  secure: true,
  auth: {
    user: configs.mailer.user,
    pass: configs.mailer.pass,
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
    from: configs.mailer.user,
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
    from: configs.mailer.user,
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
