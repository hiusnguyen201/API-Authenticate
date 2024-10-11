import client from "./indexRedis.js";

export default {
  getUser,
  setUser,
  removeUser,
};

async function getUser(id) {
  const key = getKey(id);
  const jsonData = await client.get(key);
  return jsonData ? JSON.parse(jsonData) : null;
}

async function setUser(id, value) {
  const key = getKey(id);
  await client.set(key, JSON.stringify(value));
}

async function removeUser(id) {
  const key = getKey(id);
  await client.del(key);
}

function getKey(id) {
  return `user:${id}`;
}
