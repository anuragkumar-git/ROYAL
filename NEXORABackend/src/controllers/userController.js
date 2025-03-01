const userSignUpModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const addUsers = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPasssward = await bcrypt.hash(req.body.password, salt)
        // console.log(hashedPasssward);

        req.body.password = hashedPasssward
        const adduser = await userSignUpModel.create(req.body)
        // console.log(req.body, adduser);


        res.status(201).json({
            msg: "user Created",
            // status: res.status,
            data: adduser
        })
    } catch (err) {
        res.send(`Adduser: ${err}`)
        console.log(err);
    }
}

const findUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const finduser = await userSignUpModel.findOne({ email: email })
        if (finduser) {

            // res.status(200).json({ msg: `user Found` })
            const comparePass = await bcrypt.compare(password, finduser.password)

            if (comparePass) {
                res.status(200).json({ message: "Login success" })

            } else { return res.status(401).json({ message: "Invalid credentials" }); }
        } else {
            return res.status(404).json({ msg: 'use not found' })

        }
        // const encPass = finduser.password

        console.log(req.body, finduser.password);


    } catch (error) {
        // res.send("findUser: " + error)
        res.status(500).json({ message: "Internal server error" });
        console.log("findUser: " + error)
    }
}
const getUsers = async (req, res) => {
    try {
        const getUser = await userSignUpModel.find()
        res.json({
            msg: "userFatched",
            data: getUser
        })
    } catch (error) {
        res.send(`getUsers: ${error}`)
    }
}

const getUserByID = async (req, res) => {
    try {
        const getuserbyid = await userSignUpModel.findById(req.params.id)
        res.json({
            msg: "User Found",
            data: getuserbyid
        })
    } catch (error) {
        res.send(`getuserbyID: ${error}`)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const deleteuserbyid = await userSignUpModel.findOneAndDelete(req.params.id)
        res.json({
            msg: `${deleteuserbyid?.name} delted`
        })
    } catch (error) {
        res.send(`delete user: ${error}`)
    }
}
module.exports = { findUser, addUsers, getUsers, getUserByID, deleteUserById }