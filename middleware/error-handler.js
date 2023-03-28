const { StatusCodes } = require('http-status-codes')

 
const errorHandler = (err, req, res) => {
    if(err instanceof Error){ 
        return res.status(err.status).json(err.message)
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later');

}

module.exports = errorHandler