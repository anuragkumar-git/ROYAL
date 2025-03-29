const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()

// const port = 3000
const port = process.env.PORT || 5000

try {
    app.listen(port, () => {
        // console.log(`server started on ${link}`);
        console.log(`🖥️  Server running at\x1b[34m http://localhost:${port}\x1b[0m`);

    })
} catch (error) {
    console.log(error);
}


// mongoose.connect("mongodb://localhost:27017/testnexora").then(() => {
mongoose.connect("mongodb://localhost:27017/NEXORA").then(() => {
    console.log('mongoDB connected');
}).catch((err) => {
    console.log(`Mongoose error: ${err}`);
})
app.use(cors())
app.use(express.json())

const userRoutes = require("./src/routes/userRoutes")
app.use('/users',userRoutes)


const businessRoutes = require('./src/routes/businessRoutes')
app.use('/business',businessRoutes)