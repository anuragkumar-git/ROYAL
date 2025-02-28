const { json } = require('express')
const roleModel = require('../models/roleModel')

const getAllRoles = async (request, response) => {
    try {
        const roles = await roleModel.find()
        response.json({
            message: "Data fetched",
            data: roles
        })

    } catch (error) {
        res.json({ err: error })

    }
}

const addRoles = async (req, res) => {

    try {
        const addrole = await roleModel.create(req.body)
        res.json({
            msg: "Role User created",
            data: addrole
        })
    } catch (error) {
        res.json({ err: error })
    }
}

const deletRoles = async (req, res) => {

    try {
        await roleModel.findByIdAndDelete(req.params.id)
        // const deletdroles = await roleModel.findByIdAndDelete(req.params.id)
        res.json({
            msg: "Data deleted",
            // data:deletdroles
        })
    } catch (error) {
        res.json({ err: error })
    }
}

const getRoleById = async (req, res) => {
    try {

        const getRoleId = await roleModel.findById(req.params.id)
        res.json({
            msg: "Role User found",
            data: getRoleId
        })
    } catch (error) {
        res.json({ err: error })

    }
}
module.exports = { getAllRoles, addRoles, deletRoles, getRoleById }

