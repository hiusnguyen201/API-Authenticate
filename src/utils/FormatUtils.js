class FormatUtils {
  static formatOneUser(user) {
    user = user.toObject();

    if (user.password) {
      delete user.password;
    }

    return user;
  }
}

export default FormatUtils;
