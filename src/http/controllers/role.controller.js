import roleService from "#src/services/role.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getAllRoles = async (req, res, next) => {
  try {
    const { hidden = false } = req.query;
    const roles = await roleService.getAll({ hidden });
    if (roles && roles.length > 0) {
      ResponseUtils.status200(res, "Get all roles successful", {
        count: roles.length,
        roles,
      });
    } else {
      ResponseUtils.status200(res, "No roles found", {
        count: 0,
        roles: [],
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getRole = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const role = await roleService.getOne(identify);
    if (role) {
      ResponseUtils.status200(res, "Get role successful", {
        role,
      });
    } else {
      ResponseUtils.status404(res, "Role not found");
    }
  } catch (err) {
    next(err);
  }
};

export const createRole = async (req, res, next) => {
  try {
    const role = await roleService.create(req.body);
    if (!role) {
      throw new Error("Create role failed");
    }
    ResponseUtils.status200(res, "Create role successful", {
      role,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedRole = await roleService.update(identify, req.body);
    if (!updatedRole) {
      throw new Error("Update role failed");
    }
    ResponseUtils.status200(res, "Update role successful", {
      role: updatedRole,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const result = await roleService.remove(identify);
    if (!result) {
      throw new Error("Delete role failed");
    }
    ResponseUtils.status200(res, "Delete role successful", {
      status: !!result,
    });
  } catch (err) {
    next(err);
  }
};
