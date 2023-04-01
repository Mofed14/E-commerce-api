const CustomAPIError = require("./custom-api");
const BadRequest = require("./bad-request");
const NotFound = require("./not-found");
const Unauthenicated = require("./unauthenticated");
const Unauthorized = require("./unauthorization");

module.exports = {
  CustomAPIError,
  BadRequest,
  NotFound,
  Unauthenicated,
  Unauthorized,
};
