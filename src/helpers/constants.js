const EXAMPLE_MAP_ERROR = {
  ERROR_CODES: ["CODIGO_CUSTOM"],
  BODY: {
    error_code: "error_custom",
    message: "conflict",
  },
};
// 412
const PRECONDITION_FAILED_ERROR = [EXAMPLE_MAP_ERROR];
// 409
const CONFLICT_ERROR = [EXAMPLE_MAP_ERROR];
// 503
const SERVICE_UNAVAILABLE_ERROR = {
  ERROR_CODES: ["error-converter"],
  BODY: {
    error_code: "service_unavailable",
    message: "service unavailable.",
  },
};
// 404
const NOT_FOUND_ERROR = [EXAMPLE_MAP_ERROR];

PAYMENT_STATUS = {
  ACREDITED: "ACREDITADO",
  REFUSED: "RECHAZADO",
  PENDING: "PENDIENTE",
};

module.exports = {
  PRECONDITION_FAILED_ERROR,
  SERVICE_UNAVAILABLE_ERROR,
  CONFLICT_ERROR,
  NOT_FOUND_ERROR,
  PAYMENT_STATUS,
};
