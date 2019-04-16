const log4js = require("log4js");
const path = require("path");

const logDir = path.resolve(__dirname, "../log");
const config = {
  appenders: {
    default: {
      type: "dateFile",
      filename: path.join(logDir, "log.log"),
      pattern: ".yyyy-MM-dd",
      compress: true
    },
    console: { type: "console" }
  },
  categories: {
    default: { appenders: ["default", "console"], level: "debug" },
    access: { appenders: ["default", "console"], level: "info" }
  },
  pm2: true
};

log4js.configure(config);

module.exports = log4js;
