const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()

// const port = 3000
const port = process.env.PORT || 5000 
const link = `http://localhost:${port}`

try {
    app.listen(port, () => {
        console.log(`server started on ${link}`);
    })
} catch (error) {
    console.log(error);
}


mongoose.connect("mongodb://localhost:27017/testnexora").then(() => {
    console.log('mongoDB connected');
}).catch((err) => {
    console.log(`Mongoose error: ${err}`);
})
app.use(cors())
app.use(express.json())

const userRoutes = require("./src/routes/userRoutes")
app.use(userRoutes)

const roleRoutes = require("./src/routes/roleRoutes")
app.use(roleRoutes)

const businessRoutes = require("./src/routes/bussinessRoutes")
app.use(businessRoutes)