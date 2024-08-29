import redis from "redis";
import config from "#src/config.js";

// Url Format: redis[s]://[[username][:password]@][host][:port]
const client = redis.createClient({
  url: `redis://${config.redis.user}:${config.redis.pass}@${config.redis.url}`,
});

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log("Connect to Redis failed !");
    console.log(err);
  });

export default client;
