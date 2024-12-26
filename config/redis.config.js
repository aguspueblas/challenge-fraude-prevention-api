const configEnv = require("./env");
let Redis;
let redis;
if (configEnv.SERVER.NODE_ENV === "test") {
  Redis = require("ioredis-mock");
  redis = new Redis({
    host: process.env.REDIS_HOST || "localhost", 
    port: process.env.REDIS_PORT || 6379, 
    password: process.env.REDIS_PASSWORD || null, // 
  });
} else {
  Redis = require("ioredis");
  redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379, 
    password: process.env.REDIS_PASSWORD || null,
  });
}
module.exports = redis;
