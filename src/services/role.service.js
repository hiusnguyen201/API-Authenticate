import permissionService from "./permission.service.js";
import userService from "./user.service.js";
import Role from "#src/models/role.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";

const SELECTED_FIELDS = "id name description createdAt updatedAt";

export default {
  getAll,
  countAll,
  getOne,
  getOrCreateByName,
  create,
  update,
  updatePermissions,
  remove,
};

/**
 * Get all role
 * @param {*} filter
 * @param {*} selectedFields
 * @returns
 */
async function getAll(filter, selectedFields = SELECTED_FIELDS) {
  return Role.find(filter).select(selectedFields);
}

/**
 * Count all role
 * @param {*} filter
 * @returns
 */
async function countAll(filter) {
  return await Role.countDocuments(filter);
}

/**
 * Get role
 * @param {*} identify
 * @param {*} selectedFields
 * @returns
 */
async function getOne(identify, selectedFields = SELECTED_FIELDS) {
  const filter = {};
  if (StringUtils.isUUID(identify)) {
    filter._id = identify;
  } else {
    filter.name = identify;
  }

  return await Role.findOne(filter).select(selectedFields);
}

/**
 * Get or create role by name
 * @param {*} name
 * @returns
 */
async function getOrCreateByName(name) {
  const role = await getOne(name);
  if (role) return role;

  return await Role.create({
    name,
  });
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
    permissions: [],
  });
}

/**
 * Update role
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
  const role = await getOne(identify, "_id");
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  if (role.name !== updatedData.name) {
    const existRole = await getOne(updatedData.name, "_id");
    if (existRole) {
      throw ApiErrorUtils.simple(responseCode.ROLE.EXIST_ROLE);
    }
  }

  return await Role.findByIdAndUpdate(role._id, updatedData, {
    new: true,
    select: selectedFields,
  });
}

/**
 * Update permissions for role
 * @param {*} identify
 * @param {*} permissions
 * @param {*} selectedFields
 * @returns
 */
async function updatePermissions(
  identify,
  permissions,
  selectedFields = SELECTED_FIELDS
) {
  const role = await getOne(identify, "_id");
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  const invalidPermissions = [];
  await Promise.all(
    permissions.map(async (id, index) => {
      const permission = await permissionService.getOne(id, "_id");
      if (!permission) {
        invalidPermissions.push(index + 1);
      }
      return permission;
    })
  );

  if (invalidPermissions.length > 0) {
    const response = Object.assign(
      {},
      responseCode.PERMISSION.PERMISSION_NOT_FOUND
    );
    response.message += ` at position ${invalidPermissions.join(", ")}`;
    throw ApiErrorUtils.simple(response);
  }

  return await Role.findByIdAndUpdate(
    role._id,
    {
      permissions,
    },
    {
      new: true,
      select: selectedFields + " permissions",
    }
  );
}

/**
 * Delete role
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const role = await getOne(identify, "_id");
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  const countUsers = await userService.countAll({
    roles: role._id,
  });
  if (countUsers && countUsers > 0) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_HAS_USERS);
  }

  return await Role.findOneAndUpdate(
    role._id,
    { deletedAt: Date.now() },
    { new: true }
  );
}
