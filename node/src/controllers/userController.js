const userModel = require("../models/userModel")

const addUsers = async (req, res) => {
    try {
        const addUser = await userModel.create(req.body)
        res.json({
            msg: "User Created",
            response: addUser
        })

    } catch (error) {
        res.json({
            err: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {

        const getAllUsers = await userModel.find().populate("roleId")
        res.json({
            msg: "Users Fetched",
            res: getAllUsers
        })
    } catch (error) {
        res.json({ err: error })
    }
}

const getUserById = async (req, res) => {
    try {

        const getUserbyId = await userModel.findById(req.params.id).populate("roleId")
        res.json({
            msg: "User Fetched",
            res: getUserbyId
        })
    } catch (error) {
        res.json({ err: error })
    }
}

const delUserById = async (req, res) => {
    try {
        // const delUserbyId = await userModel.findOneAndDelete(req.params.id)
        await userModel.findOneAndDelete(req.params.id)
        res.json({
            msg: "User Deleted",
            // res:delUserbyId
        })
    } catch (error) {
        res.json({ err: error })
    }
}
module.exports = { addUsers, getAllUser, getUserById, delUserById }