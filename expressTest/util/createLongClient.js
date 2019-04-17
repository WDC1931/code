const bluebird = require('bluebird');
const redis = require("redis");
const logger = require('../config/log4js.config').getLogger();
const config = require('../config/redis.config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient(config);
client.on("error", function (err) {
  client.quit();
  logger.error("Error " + err);
});
module.exports  = function(){
  return client;
}