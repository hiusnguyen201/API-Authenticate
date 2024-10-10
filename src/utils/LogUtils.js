import moment from "moment-timezone";
import path from "path";
import fs from "fs";

import config from "#src/config.js";

const colors = {
  reset: "\x1b[0m",
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  dim: "\x1b[2m",
};

const LOG_DIR_PATH = path.join(config.dirname, "public", "logs");
if (!fs.existsSync(LOG_DIR_PATH)) fs.mkdirSync(LOG_DIR_PATH);

class LogUtils {
  static saveLog(type, time, tag, message, object) {
    const date = time.slice(0, 10);
    const dirPath = path.join(LOG_DIR_PATH, date);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

    fs.appendFileSync(
      path.join(dirPath, `${type}_${tag}.log`),
      `\n${time} ${message}`
    );

    if (object) {
      fs.appendFileSync(
        path.join(dirPath, `${type}_${date}.detail.json`),
        "\n" + JSON.stringify(object)
      );
    }
  }

  static log(type, tag, message, object) {
    const time = moment().toISOString();
    const logMethod = console[type];
    const logColor = colors[type] || colors.reset;
    const logMessage = `[${
      colors.dim + time + colors.reset
    }] ${logColor}[${type}]${colors.reset} [${tag}] ${message}`;

    if (object) {
      logMethod(logMessage, "\n", object);
    } else {
      logMethod(logMessage);
    }

    this.saveLog(type, time, tag, message, object);
  }

  static info(tag, message, object = null) {
    this.log("info", tag, message, object);
  }
  static warn(tag, message, object = null) {
    this.log("warn", tag, message, object);
  }
  static error(tag, message, object = null) {
    this.log("error", tag, message, object);
  }
}

export default LogUtils;
