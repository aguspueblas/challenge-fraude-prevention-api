const { http } = require("msw");
const { setupServer } = require("msw/node");

const HandlersArch = require("./arch/arch-handler");
module.exports = {
  Msw: setupServer(...HandlersArch),
  http: http,
};
