import { customAlphabet } from "nanoid";
import regexPattern from "#src/constants/regexPattern.constant.js";

class StringUtils {
  static isUUID(str) {
    return regexPattern.UUID.test(str);
  }

  static isBearerToken(str) {
    return regexPattern.BEARER_TOKEN.test(str);
  }

  static isEmailAddress(str) {
    return regexPattern.EMAIL.test(str);
  }

  static isPhoneNumber(str) {
    return regexPattern.PHONE.test(str);
  }

  static generateNanoID() {
    const alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nanoid = customAlphabet(alphabet, 8);
    return nanoid();
  }
}

export default StringUtils;
