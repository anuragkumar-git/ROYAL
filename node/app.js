const exprss = require('express')
const app = exprss()

const PORT = 5000
const mongoose = require('mongoose')

const link = `http://localhost:${PORT}`

app.listen(PORT, () => {
    // console.log('server started on', PORT);
    console.log(`Server started on ${link}`);
})

mongoose.connect("mongodb://localhost:27017/royal").then(() => {
    console.log('mongo connected');
})

app.use(exprss.json())

const roleRouts = require('./src/routes/roleRoute')
app.use(roleRouts)

const userRoutes = require('./src/routes/userRoutes')
app.use(userRoutes)

// const user = {
//     name: 'vandan',
//     age: 654
// }

// app.get("/",(req, res)=> {
//     res.send("server started")
// })

// app.get('/user', (req, res)=> {res.send(user)})

//5 7 9 