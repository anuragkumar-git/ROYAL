const routes = require('express').Router()
const roleController = require('../controllers/roleController')

routes.get('/roles', roleController.getAllRoles)
routes.post('/role', roleController.addRoles )
routes.delete('/role/:id', roleController.deletRoles)
routes.get('/roles/:id', roleController.getRoleById)


module.exports= routes