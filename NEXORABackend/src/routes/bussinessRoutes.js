const routes = require('express').Router();
const bussinessController = require('../controllers/bussinessController')

routes.post("/registerbusiness", bussinessController.addbussinesses)

module.exports = routes