import responseCode from "#src/constants/responseCode.constant.js";
import Permission from "#src/models/permission.model.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";
import roleService from "./role.service.js";

export default { getAll, getOne, create, update, remove };

const SELECTED_FIELDS = "id value description createdAt updatedAt";

/**
 * Get all permission
 * @param {*} filter
 * @param {*} selectedFields
 * @returns
 */
async function getAll(filter, selectedFields = SELECTED_FIELDS) {
  return Permission.find(filter).select(selectedFields);
}

/**
 * Get permission
 * @param {*} identify
 * @param {*} selectedFields
 * @returns
 */
async function getOne(identify, selectedFields = SELECTED_FIELDS) {
  const filter = {};
  if (StringUtils.isUUID(identify)) {
    filter._id = identify;
  } else {
    filter.value = identify;
  }

  return await Permission.findOne(filter).select(selectedFields);
}

/**
 * Create permission
 * @param {*} data
 * @returns
 */
async function create(data) {
  const existPermission = await getOne(data.value);
  if (existPermission) {
    throw ApiErrorUtils.simple(responseCode.PERMISSION.EXIST_PERMISSION);
  }

  return await Permission.create({
    ...data,
  });
}

/**
 * Update permission
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
  const permission = await getOne(identify, "_id");
  if (!permission) {
    throw ApiErrorUtils.simple(
      responseCode.PERMISSION.PERMISSION_NOT_FOUND
    );
  }

  if (permission.value !== updatedData.value) {
    const existPermission = await getOne(updatedData.value);
    if (existPermission) {
      throw ApiErrorUtils.simple(responseCode.PERMISSION.EXIST_PERMISSION);
    }
  }

  return await Permission.findByIdAndUpdate(permission._id, updatedData, {
    new: true,
    select: selectedFields,
  });
}

/**
 * Remove permission
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const permission = await getOne(identify, "_id");
  if (!permission) {
    throw ApiErrorUtils.simple(
      responseCode.PERMISSION.PERMISSION_NOT_FOUND
    );
  }

  const countRoles = await roleService.countAll({
    permissions: permission._id,
  });

  if (countRoles && countRoles > 0) {
    throw ApiErrorUtils.simple(
      responseCode.PERMISSION.PERMISSION_HAS_ROLES
    );
  }

  return await Permission.findOneAndUpdate(
    permission._id,
    { deletedAt: Date.now() },
    { new: true }
  );
}
