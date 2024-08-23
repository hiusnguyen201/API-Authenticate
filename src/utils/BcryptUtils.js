import bcrypt from "bcrypt";

class BcryptUtils {
  static makeHash(value) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(value, salt);
  }

  static compareHash(value, hash) {
    return bcrypt.compareSync(value, hash);
  }
}

export default BcryptUtils;
