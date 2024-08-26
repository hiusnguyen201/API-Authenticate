class FormatUtils {
  static formatOneUser(user) {
    user = user.toObject();

    delete user.password;
    delete user.deletedAt;

    return user;
  }
}

export default FormatUtils;
