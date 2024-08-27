import roleService from "./role.service.js";
import User from "#src/models/user.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
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
  updateRoles,
  countWithFilter,
  SELECTED_FIELDS,
};

/**
 * Get all user
 * @param {*} filter
 * @param {*} selectedFields
 * @returns
 */
async function getAll(filter, selectedFields = SELECTED_FIELDS) {
  return User.find(filter).select(selectedFields);
}

async function getOrCreateByGoogleId(
  googleId,
  email,
  name,
  selectedFields = SELECTED_FIELDS
) {
  const user = await User.findOne({ email });
  if (user) {
    return User.findByIdAndUpdate(
      user._id,
      {
        googleId,
      },
      {
        new: true,
        select: selectedFields,
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
 * @param {*} selectedFields
 * @returns
 */
async function getOne(identify, selectedFields = SELECTED_FIELDS) {
  const filter = {};

  if (StringUtils.isUUID(identify)) {
    filter._id = identify;
  } else if (StringUtils.isEmailAddress(identify)) {
    filter.email = identify;
  } else if (StringUtils.isPhoneNumber(identify)) {
    filter.phone = identify;
  } else {
    filter.username = identify;
  }

  return User.findOne(filter).select(selectedFields).exec();
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
 * @param {*} selectedFields
 * @returns
 */
async function updateById(
  id,
  updatedData,
  selectedFields = SELECTED_FIELDS
) {
  return User.findByIdAndUpdate(id, updatedData, {
    new: true,
    select: selectedFields,
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

async function updateRoles(
  identify,
  roleIds,
  selectedFields = SELECTED_FIELDS
) {
  if (typeof roleIds === "string") {
    roleIds = [roleIds];
  }

  const user = await getOne(identify);
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.USER.USER_NOT_FOUND);
  }

  const invalidRoles = [];
  await Promise.all(
    roleIds.map(async (roleId, index) => {
      const role = await roleService.getOne(roleId);
      if (!role) {
        invalidRoles.push(index + 1);
      }
      return role;
    })
  );

  if (invalidRoles.length > 0) {
    const response = Object.assign({}, responseCode.ROLE.ROLE_NOT_FOUND);
    response.message += ` at position ${invalidRoles.join(", ")}`;
    throw ApiErrorUtils.simple(response);
  }

  return await User.findByIdAndUpdate(
    user._id,
    {
      roles: roleIds,
    },
    {
      new: true,
      select: selectedFields + " roles",
    }
  );
}

async function countWithFilter(filter) {
  return await User.countDocuments(filter);
}
