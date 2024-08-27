import Role from "#src/models/role.model.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";
import actionPermission from "#src/constants/actionPermission.constant.js";

function checkPermission() {
  return async (req, res, next) => {
    const roles = await Role.find({ _id: { $in: req.roles } }).populate(
      "permissions"
    );

    let permissions = [];
    roles.map((role) => {
      permissions = [...new Set([...permissions, ...role.permissions])];
    });

    const { method, originalUrl } = req;
    const resource = originalUrl.split("/");

    const hasPermission =
      permissions.findIndex(
        (item) =>
          item.value === `${resource[3]}.${actionPermission[method]}`
      ) !== -1;

    if (!hasPermission) {
      return ResponseUtils.status403(res);
    }

    next();
  };
}

export const hasPermission = checkPermission();
