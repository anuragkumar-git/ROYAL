const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require("express")

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
app.use(cookieParser())

const userRoutes = require("./src/routes/userRoutes")
app.use('/api/users',userRoutes)


const businessRoutes = require('./src/routes/businessRoutes')
app.use('/api/business',businessRoutes)

const dealRoutes = require('./src/routes/dealRoutes')
app.use('/api/deals', dealRoutes)

const reviewRoutes = require('./src/routes/reviewRoutes')
app.use('/api/reviews', reviewRoutes)


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  });