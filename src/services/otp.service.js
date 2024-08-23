import otpGenerator from "otp-generator";
import Otp from "#src/models/otp.model.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";

export default { createOtp, validateOtp };

async function createOtp(userId) {
  await Otp.findOneAndDelete({ user: userId });

  const otpCode = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const otpHash = BcryptUtils.makeHash(otpCode);
  await Otp.create({
    user: userId,
    otp: otpHash,
  });

  return otpCode;
}

async function validateOtp(userId, otpCode) {
  const otp = await Otp.findOne({ user: userId }).sort({
    createdAt: "desc",
  });

  if (!otp) {
    return false;
  }

  const result = BcryptUtils.compareHash(otpCode, otp.otp);
  if (result) {
    await Otp.findOneAndDelete({ user: userId });
  }

  return result;
}
