import otpGenerator from "otp-generator";
import Otp from "#src/models/otp.model.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";

export default { createOtp, validateOtp };

async function createOtp(email) {
  const otpCode = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const otpHash = BcryptUtils.makeHash(otpCode);

  return await Otp.create({
    email,
    otp: otpHash,
  });
}

async function validateOtp(email, otpCode) {
  const otp = await Otp.findOne({ email }).sort({
    createdAt: "desc",
  });

  if (!otp) {
    return false;
  }

  return BcryptUtils.compareHash(otpCode, otp.otp);
}
