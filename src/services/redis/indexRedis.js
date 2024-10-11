import redis from "redis";
import config from "#src/config.js";
import LogUtils from "#src/utils/LogUtils.js";

// Url Format: redis[s]://[[username][:password]@][host][:port]
const client = redis.createClient({
  url: `redis://${config.redis.user}:${config.redis.pass}@${config.redis.url}`,
});

client
  .connect()
  .then(() => {
    LogUtils.info("REDIS", "Connect successfully to Redis");
  })
  .catch((err) => {
    LogUtils.error("REDIS", "Connect to Redis failed", err);
  });

export default client;
