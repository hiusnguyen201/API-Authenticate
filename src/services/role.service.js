import Role from "#src/models/role.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";

const SELECTED_FIELDS = "id name description createdAt updatedAt";

export default { getAll, create, update, remove, getOne };

/**
 * Get all role
 * @param {*} filter
 * @param {*} selectedFields
 * @returns
 */
async function getAll(filter, selectedFields) {
  if (!selectedFields) selectedFields = SELECTED_FIELDS;
  return Role.find(filter).select(selectedFields);
}

/**
 * Create role
 * @param {*} data
 * @returns
 */
async function create(data) {
  const existRole = await getOne(data.name);
  if (existRole) {
    throw ApiErrorUtils.simple(responseCode.ROLE.EXIST_ROLE);
  }

  return await Role.create({
    ...data,
  });
}

/**
 * Get role
 * @param {*} identify
 * @param {*} selectedFields
 * @returns
 */
async function getOne(identify, selectedFields) {
  const filter = {};
  if (StringUtils.isUUID(identify)) {
    filter._id = identify;
  } else {
    filter.name = identify;
  }

  if (!selectedFields) selectedFields = SELECTED_FIELDS;

  return await Role.findOne(filter).select(selectedFields);
}

/**
 * Update role
 * @param {*} identify
 * @param {*} updatedData
 * @param {*} selectedFields
 * @returns
 */
async function update(identify, updatedData, selectedFields) {
  const role = await getOne(identify);
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  if (role.name !== updatedData.name) {
    const existRole = await getOne(updatedData.name);
    if (existRole) {
      throw ApiErrorUtils.simple(responseCode.ROLE.EXIST_ROLE);
    }
  }

  return await Role.findByIdAndUpdate(role._id, updatedData, {
    new: true,
    select: selectedFields ? selectedFields : SELECTED_FIELDS,
  });
}

/**
 * Delete role
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const role = await getOne(identify, "_id users");
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  if (role.users && role.users.length > 0) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_HAS_USERS);
  }

  return await Role.findOneAndUpdate(
    role._id,
    { deletedAt: Date.now() },
    { new: true }
  );
}
