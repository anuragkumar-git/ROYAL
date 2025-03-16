const roleModel = require('../models/roleModel')

const addRoles = async (req, res) => {
    try {
        const addRole = await roleModel.create(req.body)
        res.status(201).json({
            msg: "Role created",
            role: addRole
        })
    } catch (error) {
        console.log('roleController:',error);
        
            res.send(error)
    }
}

module.exports = {addRoles}