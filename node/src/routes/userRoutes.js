const routes = require('express').Router()

const userController = require("../controllers/userController")

routes.post('/adduser', userController.addUsers)
routes.get('/getallusers', userController.getAllUser)
routes.get('/getuserbyid/:id', userController.getUserById)
routes.delete('/deluser/:id', userController.delUserById)
module.exports = routes
