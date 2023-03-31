const express = require('express')
const routes = express.Router()
const { login, register, logout } = require('../controller/auth')

routes.route('/register').post(register)
routes.route('/login').post(login)
routes.route('/logout').get(logout)

module.exports = routes