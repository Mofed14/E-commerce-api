const CustomAPIError = require("./custom-api");
const { StatusCodes } = require("http-status-codes");

class Unauthorized extends CustomAPIError {
  constructor(messeage) {
    super(messeage);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
