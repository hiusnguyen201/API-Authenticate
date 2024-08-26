import userService from "#src/services/user.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    if (users && users.length > 0) {
      ResponseUtils.status200(res, "Get all users successful", {
        count: users.length,
        users,
      });
    } else {
      ResponseUtils.status200(res, "No users found", {
        count: 0,
        users: [],
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const user = await userService.getOne(identify);
    if (user) {
      ResponseUtils.status200(res, "Get user successful", {
        user,
      });
    } else {
      ResponseUtils.status404(res, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    if (!user) {
      throw new Error("Create user failed");
    }
    ResponseUtils.status200(res, "Create user successful", {
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedUser = await userService.updateById(identify, req.body);
    if (!updatedUser) {
      throw new Error("Update user failed");
    }
    ResponseUtils.status200(res, "Update user successful", {
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.remove(identify);
    if (!result) {
      throw new Error("Delete user failed");
    }
    ResponseUtils.status200(res, "Delete user successful", {
      status: !!result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserRoles = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const { roles = [] } = req.body;
    const updatedUser = await userService.updateRoles(identify, roles);
    if (!updatedUser) {
      throw new Error("Update role failed");
    }
    ResponseUtils.status200(res, "Update role successful", {
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
