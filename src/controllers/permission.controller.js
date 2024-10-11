import permissionService from "#src/services/permission.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await permissionService.getAll();
    if (permissions && permissions.length > 0) {
      ResponseUtils.status200(res, "Get all permissions successful", {
        count: permissions.length,
        permissions,
      });
    } else {
      ResponseUtils.status200(res, "No permissions found", {
        count: 0,
        permissions: [],
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getPermission = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const permission = await permissionService.getOne(identify);
    if (permission) {
      ResponseUtils.status200(res, "Get permission successful", {
        permission,
      });
    } else {
      ResponseUtils.status404(res, "Permission not found");
    }
  } catch (err) {
    next(err);
  }
};

export const createPermission = async (req, res, next) => {
  try {
    const permission = await permissionService.create(req.body);
    if (!permission) {
      throw new Error("Create permission failed");
    }
    ResponseUtils.status200(res, "Create permission successful", {
      permission,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePermission = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedPermission = await permissionService.update(
      identify,
      req.body
    );
    if (!updatedPermission) {
      throw new Error("Update permission failed");
    }
    ResponseUtils.status200(res, "Update permission successful", {
      permission: updatedPermission,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePermission = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const result = await permissionService.remove(identify);
    if (!result) {
      throw new Error("Delete permission failed");
    }
    ResponseUtils.status200(res, "Delete permission successful", {
      status: !!result,
    });
  } catch (err) {
    next(err);
  }
};
