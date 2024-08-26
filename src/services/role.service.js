import Role from "#src/models/role.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";

const SELECTED_FIELDS = "id name description createdAt updatedAt";

export default { getAll, create, update, hidden, remove, getOne };

async function getAll(filter, selectedFields) {
  if (!selectedFields) selectedFields = SELECTED_FIELDS;
  return Role.find(filter).select(selectedFields);
}

async function create(data) {
  const existRole = await getOne(data.name);
  if (existRole) {
    throw ApiErrorUtils.simple(responseCode.ROLE.EXIST_ROLE);
  }

  return await Role.create({
    ...data,
  });
}

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

async function hidden(identify) {
  const role = await getOne(identify, "_id users");
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  return await Role.findByIdAndUpdate(
    role._id,
    {
      hidden: true,
    },
    { new: true }
  );
}

async function remove(identify) {
  const role = await getOne(identify, "_id users");
  if (!role) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_NOT_FOUND);
  }

  if (role.users && role.users.length > 0) {
    throw ApiErrorUtils.simple(responseCode.ROLE.ROLE_HAS_USERS);
  }

  return await Role.findOneAndDelete(role._id);
}
