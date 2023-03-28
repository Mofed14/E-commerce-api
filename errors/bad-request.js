const CustomAPIError = require("./custom-api");
const { StatusCodes } = require('http-status-codes')
class BadRequest extends CustomAPIError{ 
    constructor(messeage, status) {
        super(messeage)
        this.status = StatusCodes.BAD_REQUEST 
    }
}

module.exports = BadRequest