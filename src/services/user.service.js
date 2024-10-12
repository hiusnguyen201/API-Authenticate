import roleService from "./role.service.js";
import cloudinaryService from "./cloudinary.service.js";
import User from "#src/models/user.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import StringUtils from "#src/utils/StringUtils.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import UploadUtils from "#src/utils/UploadUtils.js";

const SELECTED_FIELDS = "_id name username email createdAt updatedAt";

export default {
  getAll,
  countAll,
  create,
  getOne,
  getOrCreateByGoogleId,
  update,
  remove,
  updateRoles,
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

/**
 * Count all user
 * @param {*} filter
 * @returns
 */
async function countAll(filter) {
  return await User.countDocuments(filter);
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

  return await User.findOne(filter).select(selectedFields);
}

/**
 * Get or create user by googleId
 * @param {*} googleId
 * @param {*} email
 * @param {*} name
 * @param {*} selectedFields
 * @returns
 */
async function getOrCreateByGoogleId(
  googleId,
  email,
  name,
  selectedFields = SELECTED_FIELDS
) {
  StringUtils.lowerCaseAll([email]);
  const user = await getOne(email, "_id");
  if (user) {
    return await User.findByIdAndUpdate(
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
 * @param {*} roleIds - string | array
 * @returns
 */
async function create(data, roleIds = []) {
  StringUtils.lowerCaseAllInObj(data, ["username", "email"]);
  roleIds = Array.isArray(roleIds) ? roleIds : [roleIds];

  const [existUsername, existEmail] = await Promise.all([
    getOne(data?.username, "_id"),
    getOne(data?.email, "_id"),
  ]);

  if (existUsername) {
    throw ApiErrorUtils.simple(responseCode.AUTH.EXIST_USERNAME);
  }

  if (existEmail) {
    throw ApiErrorUtils.simple(responseCode.AUTH.EXIST_EMAIL);
  }

  const hash = BcryptUtils.makeHash(data.password);
  const user = await User.create({
    ...data,
    roles: roleIds,
    password: hash,
  });

  if (data.files && data.files.length > 0) {
    cloudinaryService
      .saveAvatar(data.files[0], user._id)
      .then((result) => {
        UploadUtils.clearUploadFile(data.files);
        user.avatar = result.secure_url;
        user.save();
      });
  }

  return user;
}

/**
 * Update user
 * @param {*} identify
 * @param {*} updatedData
 * @param {*} selectedFields
 * @returns
 */
async function update(
  identify,
  updatedData,
  selectedFields = SELECTED_FIELDS
) {
  const user = await getOne(identify, "_id");
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.USER.USER_NOT_FOUND);
  }

  return User.findByIdAndUpdate(user._id, updatedData, {
    new: true,
    select: selectedFields,
  });
}

/**
 * Update roles for user
 * @param {*} identify
 * @param {*} roleIds
 * @param {*} selectedFields
 * @returns
 */
async function updateRoles(
  identify,
  roleIds,
  selectedFields = SELECTED_FIELDS
) {
  if (typeof roleIds === "string") {
    roleIds = [roleIds];
  }

  const user = await getOne(identify, "_id");
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

/**
 * Delete user
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const user = await getOne(identify, "_id");
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.USER.USER_NOT_FOUND);
  }

  return await User.findOneAndUpdate(
    user._id,
    { deletedAt: Date.now() },
    { new: true }
  );
}
