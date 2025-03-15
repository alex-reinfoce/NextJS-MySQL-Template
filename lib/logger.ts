import fs from "fs";
import path from "path";
import winston from "winston";

const { format } = winston;
const { combine, timestamp, errors, splat, printf, colorize } = format;

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}][${level}] ${message}`;
});

const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }),
  errors({ stack: true }),
  splat(),
  customFormat,
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info",
      format: combine(format((info) => (info.level === "info" ? info : false))(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: combine(format((info) => (info.level === "error" ? info : false))(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "warn.log"),
      level: "warn",
      format: combine(format((info) => (info.level === "warn" ? info : false))(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "debug.log"),
      level: "debug",
      format: combine(format((info) => (info.level === "debug" ? info : false))(), logFormat),
    }),
    // 开发环境下同时输出到控制台
    ...(process.env.NODE_ENV !== "production"
      ? [
          new winston.transports.Console({
            format: combine(colorize({ all: true }), timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }), customFormat),
          }),
        ]
      : []),
  ],
});

export { logger };
