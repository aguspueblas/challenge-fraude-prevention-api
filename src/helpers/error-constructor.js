exports.ErrorConstructor = (errorCode, message, details) => ({
  code: errorCode,
  message,
  details,
});
