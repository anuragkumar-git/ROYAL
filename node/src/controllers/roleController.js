const { json } = require('express')
const roleModel = require('../models/roleModel')

const getAllRoles = async (request, response) => {
    const roles = await roleModel.find()
    response.json({
        message: "Data fetched",
        data: roles
    })
}

const addRoles = async (req, res) => {
    const addrole = await roleModel.create(req.body)
    res.json({
        msg:"Role User created",
        data: addrole
    })
}

const deletRoles = async (req,res)=>{
    await roleModel.findByIdAndDelete(req.params.id)
    // const deletdroles = await roleModel.findByIdAndDelete(req.params.id)
    res.json({
        msg: "Data deleted",
        // data:deletdroles
    })}

const getRoleById = async (req, res)=>{
    const getRoleId = await roleModel.findById(req.params.id)
    res.json({
        msg:"Role User found",
        data:getRoleId
    })
}
module.exports = { getAllRoles, addRoles, deletRoles, getRoleById}

