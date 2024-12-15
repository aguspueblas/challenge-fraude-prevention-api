const { BusinessMocks } = require("../../test/mock");
const { CreatedResponse } = require("../api/responses");
const { ENDPOINT_LIST } = require("./constants");
/**
 * Funcion que determina si se debe devolver un mock
 *
 * @param {Object} headers Headers
 * @returns {{ true | false }}
 */
const checkIfNeedResponseMock = (headers) => {
  return process.env.NODE_ENV !== "prod" && headers["get-mock"] === "true";
};
/**
 *
 * @param {string} endpoint
 * @returns
 */
const getMockResponse = (endpoint) => {
  let mock = null;
  switch (endpoint) {
    case ENDPOINT_LIST.POST_V1_EXAMPLE: {
      let createdResponse = new CreatedResponse();
      createdResponse.setCustomResponse(
        BusinessMocks.PostV1Example.Response.CREATED.body,
      );
      mock = createdResponse;
      break;
    }
  }
  return mock.getResponse();
};
module.exports = {
  checkIfNeedResponseMock,
  getMockResponse,
};
