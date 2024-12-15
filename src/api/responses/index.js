const { OkResponse } = require("./success/ok");
const { CreatedResponse } = require("./success/created");
const {
  InternalServerErrorResponse,
} = require("./error/internal-server-error");
const { NotFoundResponse } = require("./error/not-found");
const { ForbiddenResponse } = require("./error/forbidden");
const { BadRequestResponse } = require("./error/bad-request");
const { ServiceUnavailableResponse } = require("./error/service-unavailable");
const { PreconditionFailedResponse } = require("./error/precondition-failed");
const { ConflictResponse } = require("./error/conflict");
module.exports = {
  CreatedResponse,
  OkResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  ForbiddenResponse,
  BadRequestResponse,
  ServiceUnavailableResponse,
  PreconditionFailedResponse,
  ConflictResponse,
};
