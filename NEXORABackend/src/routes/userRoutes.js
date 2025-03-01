const routes = require('express').Router()
const userController = require('../controllers/userController')

routes.post("/signup", userController.addUsers)
routes.get("/", userController.getUsers)
routes.post("/login", userController.findUser)
routes.get("/:id", userController.getUserByID)
routes.delete("/deleteuser/:id", userController.deleteUserById)
module.exports = routes