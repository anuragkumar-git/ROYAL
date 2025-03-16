const roleModel = require('../models/roleModel')
const userSignUpModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const addUsers = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const emailExsit = await userSignUpModel.findOne({ email })
        // console.log(email);
        if (emailExsit) {
            // console.error(`❌ ${email} already exsits`);

            return (res.status(409).json({
                msg: `❌ ${email} already exsits`,
                data: emailExsit
            })
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPasssward = await bcrypt.hash(password, salt)

        const userRole = await roleModel.findOne({ role: "user" })
        if (!userRole) { return res.status(500).json({ msg: "User role not found" }) }
        // console.log(userRole);

        // const adduser = await userSignUpModel.create(req.body)
        const adduser = await userSignUpModel.create({
            name, email, password: hashedPasssward, role: {
                id: userRole._id,
                desc: userRole.role
            }
        })
        console.log(`✔️ ${email} created`);

        res.status(201).json({
            msg: "user Created",
            // status: res.status,
            // data: adduser
        })

        // // console.log(req.body, adduser);
    } catch (err) {
        res.send(`Adduser: ${err}`)
        console.log(err);
    }
}

const findUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const finduser = await userSignUpModel.findOne({ email })
        if (finduser) {

            // res.status(200).json({ msg: `user Found` })
            const comparePass = await bcrypt.compare(password, finduser.password)

            if (comparePass) {
                res.status(200).json({ message: "Login success", data: finduser })
                console.log(finduser);
                // localStorage.setItem(user, finduser.email)
            } else {
                return (
                    res.status(401).json({
                        message: "Invalid credentials"
                    }))
            }
        } else {
            return res.status(404).json({ msg: 'use not found' })

        }
        // const encPass = finduser.password

        // console.log(req.body, finduser.password);


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