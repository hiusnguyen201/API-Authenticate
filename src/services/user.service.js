import responseCode from "#src/constants/responseCode.constant.js";
import User from "#src/models/user.model.js";
import StringUtils from "#src/utils/StringUtils.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";

const SELECTED_FIELDS = "_id name username email createdAt updatedAt";

export default {
  create,
  getOne,
  SELECTED_FIELDS,
};

/**
 * Create user
 * @param {*} data - object data
 * @returns
 */
async function create(data) {
  const existUsername = await isExist("username", data?.username);
  if (existUsername) {
    throw ApiErrorUtils.simple(responseCode.AUTH.EXIST_USERNAME);
  }

  const existEmail = await isExist("email", data?.email);
  if (existEmail) {
    throw ApiErrorUtils.simple(responseCode.AUTH.EXIST_EMAIL);
  }

  const hash = BcryptUtils.makeHash(data.password);
  return await User.create({
    ...data,
    password: hash,
  });
}

/**
 * Get user
 * @param {*} identify - find by _id or username
 * @param {*} selectFields
 * @returns
 */
async function getOne(identify, selectFields = null) {
  const filter = {};

  if (!selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  if (StringUtils.isUUID(identify)) {
    filter._id = identify;
  } else if (StringUtils.isEmailAddress(identify)) {
    filter.email = identify;
  } else {
    filter.username = identify;
  }

  return User.findOne(filter).select(selectFields).exec();
}

async function isExist(key, value) {
  return User.findOne({ [key]: value })
    .select("_id")
    .exec();
}
