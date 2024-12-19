const { http } = require("msw");
const { setupServer } = require("msw/node");

const HandlerConnectors = require('./handler-connectors')
module.exports = {
  Msw: setupServer(...HandlerConnectors),
  http: http,
};
