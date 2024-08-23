import userService from "#src/services/user.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getInfo = async (req, res, next) => {
  try {
    const user = await userService.getOne(req.user._id);
    if (user) {
      ResponseUtils.status200(res, "Get info successfully !", {
        user,
      });
    } else {
      ResponseUtils.status404(res, "User not found !");
    }
  } catch (err) {
    next(err);
  }
};
