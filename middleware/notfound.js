const { StatusCodes } = require('http-status-codes')
// wy we don`t pass next, because we do`nt want any thing after that. logically routes does not exist
const notfound = (req, res)=> res.status(StatusCodes.NOT_FOUND).send('Route does not exist');
module.exports = notfound