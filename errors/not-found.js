const CustomAPIError = require("./custom-api");
const { StatusCodes } = require('http-status-codes')
class NotFound extends CustomAPIError{ 
    constructor(messeage, status) {
        super(messeage)
        this.status = StatusCodes.NOT_FOUND 
    }
}

module.exports = NotFound