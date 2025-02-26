const userModel = require("../models/userModel")

const addUsers = async (req, res) => {
    const addUser = await userModel.create(req.body)
    res.json({
        msg: "User Created",
        response: addUser
    })
}

const getAllUser = async (req, res) => {
    const getAllUsers = await userModel.find()
    res.json({
        msg: "Users Fetched",
        res: getAllUsers
    })
}

const getUserById = async (req, res) => {
    const getUserbyId = await userModel.findById(req.params.id)
    res.json({
        msg: "User Fetched",
        res: getUserbyId
    })
}

const delUserById = async (req, res) =>{
    // const delUserbyId = await userModel.findOneAndDelete(req.params.id)
    const delUserbyId = await userModel.findOneAndDelete(req.params.id)
    res.json({
        msg:"User Deleted",
        res:delUserbyId
    })
}
module.exports = { addUsers, getAllUser, getUserById, delUserById }