import responseCode from "#src/constants/responseCode.constant.js";
import User from "#src/models/user.model.js";
import StringUtils from "#src/utils/StringUtils.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";

const SELECTED_FIELDS = "_id name username email createdAt updatedAt";

export default {
  getAll,
  create,
  getOne,
  updateById,
  getOrCreateByGoogleId,
  remove,
  SELECTED_FIELDS,
};

/**
 * Get all user
 * @param {*} filter
 * @param {*} selectedFields
 * @returns
 */
async function getAll(filter, selectedFields) {
  if (!selectedFields) selectedFields = SELECTED_FIELDS;
  return User.find(filter).select(selectedFields);
}
async function getOrCreateByGoogleId(googleId, email, name, selectFields) {
  if (!selectFields) selectFields = SELECTED_FIELDS;

  const user = await User.findOne({ email });
  if (user) {
    return User.findByIdAndUpdate(
      user._id,
      {
        googleId,
      },
      {
        new: true,
        select: selectFields,
      }
    );
  }

  const newUser = await User.create({
    name,
    email,
    googleId,
  });
  return getOne(newUser._id);
}

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
  } else if (StringUtils.isPhoneNumber(identify)) {
    filter.phone = identify;
  } else {
    filter.username = identify;
  }

  return User.findOne(filter).select(selectFields).exec();
}

/**
 * Check user exist
 * @param {*} key
 * @param {*} value
 * @returns
 */
async function isExist(key, value) {
  return User.findOne({ [key]: value })
    .select("_id")
    .exec();
}

/**
 * Update user by id
 * @param {*} id
 * @param {*} updatedData
 * @param {*} selectFields
 * @returns
 */
async function updateById(id, updatedData, selectFields = null) {
  if (!selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  return User.findByIdAndUpdate(id, updatedData, {
    new: true,
    select: selectFields,
  });
}

/**
 * Delete user
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const user = await getOne(identify);
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.USER.USER_NOT_FOUND);
  }

  return await User.findOneAndUpdate(
    user._id,
    { deletedAt: Date.now() },
    { new: true }
  );
}
