const CustomAPIError = require("./custom-api");
const { StatusCodes } = require('http-status-codes')
class Unauthenicated extends CustomAPIError{ 
    constructor(messeage, status) {
        super(messeage)
        this.status = StatusCodes.UNAUTHORIZED 
    }
}

module.exports = Unauthenicated