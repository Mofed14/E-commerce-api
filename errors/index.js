const CustomAPIError = require('./custom-api')
const BadRequest  = require('./bad-request')
const NotFound = require('./not-found')
const Unauthenicated = require('./unauthenticated')

module.exports = { 
    CustomAPIError,
    BadRequest,
    NotFound,
    Unauthenicated
}