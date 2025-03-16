const roleController = require('../controllers/roleController')
const routes = require('express').Router()

// routes.post("/signup", userController.addUsers)

routes.post("/addrole", roleController.addRoles)

module.exports = routes