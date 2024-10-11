import LogUtils from "#src/utils/LogUtils.js";

const LOG_TAG = "HTTP_TRAFFIC";

export default logger;

function logger(req, res, next) {
  const { url, method, ipv4 } = req;
  res.on("finish", () => {
    LogUtils.info(LOG_TAG, `${ipv4} ${method} ${url} (${res.statusCode})`);
  });
  next();
}
