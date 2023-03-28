const CustomAPIError = require("./custom-api");
const { StatusCodes } = require('http-status-codes')
class Unauthenicated extends CustomAPIError{ 
    constructor(messeage) {
        super(messeage)
        this.statusCode = StatusCodes.UNAUTHORIZED 
    }
}

module.exports = Unauthenicated