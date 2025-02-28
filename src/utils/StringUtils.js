import { customAlphabet } from "nanoid";
import { regexPattern } from "#src/constants/common.constant.js";

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

  static removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  static replaceAll(str, target, replaced) {
    return str.replaceAll(target, replaced);
  }

  static lowerCaseAllInObj(obj, keys = []) {
    keys.forEach((key) => {
      obj[key] = obj[key].toLowerCase();
    });
  }

  static randomNumber(digits) {
    return Math.floor(Math.random() * 10 ** digits);
  }
}

export default StringUtils;
