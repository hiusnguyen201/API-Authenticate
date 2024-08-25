class FormatUtils {
  static formatOneUser(user) {
    user = user.toObject();

    delete user.password;

    return user;
  }
}

export default FormatUtils;
