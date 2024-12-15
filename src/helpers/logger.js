/* eslint-disable no-unused-vars */
const {
  getRequestId,
  getRequestClientId,
} = require("../api/middlewares/request-context");
const winston = require("winston");
const { combine, printf } = winston.format;
const path = require("path");

const formatDate = () => {
  const date = new Date();
  return date.toISOString();
};

const getLogInfo = (previousLevel = 2, consolePadding = 8) => {
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _prepareStackTrace;

  const stackFilename = stack[previousLevel].getFileName();

  const filename = path
    .relative(path.dirname("src"), stackFilename)
    .replace(/\\/g, "/");
  const line = stack[previousLevel].getLineNumber();
  const column = stack[previousLevel].getColumnNumber() - consolePadding;
  const lineAndCol = `${line}:${column}`;
  return { filename, line, column, lineAndCol };
};

const formatArg = (arg) => {
  try {
    if (typeof arg == "object") return JSON.stringify(arg);

    return String(arg);
  } catch (error) {
    //avoids TypeError: Converting circular structure to JSON or any error to convert to string
    return String(arg);
  }
};

const formatMessage = (level, args, logInfo) => {
  const requestId = getRequestId();
  const requestClientId = getRequestClientId();

  const combinedArgs = args.map((arg) => formatArg(arg)).join(" ");

  return `${formatDate()}|${logInfo.filename}|${logInfo.line}|${requestClientId}|${level.toUpperCase()}|${requestId}|${combinedArgs}`;
};

/* eslint-disable no-unused-vars */
const customFormat = ({ level, message }) => {
  return message;
};

const myFormat = printf(customFormat);

const customLogger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(myFormat),
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

const overWriteLogs = () => {
  console.log = (...args) => {
    const logInfo = getLogInfo(1, 7);
    const infoToLog = formatMessage("INFO", args, logInfo);
    customLogger.info(infoToLog);
  };

  console.error = (...args) => {
    const logInfo = getLogInfo(1, 7);
    const infoToLog = formatMessage("ERROR", args, logInfo);
    customLogger.error(infoToLog);
  };

  console.warn = (...args) => {
    const logInfo = getLogInfo(1, 7);
    const infoToLog = formatMessage("WARN", args, logInfo);
    customLogger.warn(infoToLog);
  };

  console.info = (...args) => {
    const logInfo = getLogInfo(1, 7);
    const infoToLog = formatMessage("INFO", args, logInfo);
    customLogger.info(infoToLog);
  };

  console.debug = (...args) => {
    const logInfo = getLogInfo(1, 7);
    const infoToLog = formatMessage("DEBUG", args, logInfo);
    customLogger.debug(infoToLog);
  };
};

module.exports = {
  overWriteLogs,
};
