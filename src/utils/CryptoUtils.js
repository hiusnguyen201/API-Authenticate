import CryptoJS from "crypto-js";

class CryptoUtils {
  static randomCrypto() {
    return CryptoJS.SHA256(Date.now() + Math.random());
  }
}

export default CryptoUtils;
