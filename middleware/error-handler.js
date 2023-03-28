const { CustomAPIError } = require('../errors'); 
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res) => {
    if(err instanceof CustomAPIError){ 
        return res.status(err.status).json({msg : err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err.message});

}

module.exports = errorHandlerMiddleware