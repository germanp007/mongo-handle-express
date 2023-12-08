import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { config } from "../config/config.js";

const currentEnv = config.server.env;
console.log(currentEnv);
const customLevels = {
  levels: {
    error: 0,
    advertencia: 1,
    info: 2,
    debbug: 3,
  },
  colors: {
    error: "red",
    advertencia: "yellow",
    info: "green",
    debbug: "blue",
  },
};
winston.addColors(customLevels.colors);
const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    //new winston.transports.Console({ level: "debbug" }),
    new winston.transports.File({
      filename: path.join(__dirname, "/logs/warnings.log"),
      level: "debbug",
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "/logs/warnings.log"),
      level: "info",
    }),
  ],
});

let logger;

if (currentEnv === "development") {
  logger = devLogger;
} else {
  logger = prodLogger;
}

export { logger };
