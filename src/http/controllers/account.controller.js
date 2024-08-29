import userService from "#src/http/services/user.service.js";
import userRedisService from "#src/http/services/redis/userRedis.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getInfo = async (req, res, next) => {
  try {
    const id = req.user._id;
    const userCache = await userRedisService.getUser(id);
    if (userCache) {
      return ResponseUtils.status200(res, "Get info successfully !", {
        user: userCache,
      });
    }

    const user = await userService.getOne(id);
    if (!user) {
      return ResponseUtils.status404(res, "User not found !");
    }

    await userRedisService.setUser(id, user);
    return ResponseUtils.status200(res, "Get info successfully !", {
      user,
    });
  } catch (err) {
    next(err);
  }
};
