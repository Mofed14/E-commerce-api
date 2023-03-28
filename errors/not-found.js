const CustomAPIError = require("./custom-api");
const { StatusCodes } = require('http-status-codes')
class NotFound extends CustomAPIError{ 
    constructor(messeage) {
        super(messeage)
        this.statusCode = StatusCodes.NOT_FOUND 
    }
}

module.exports = NotFound