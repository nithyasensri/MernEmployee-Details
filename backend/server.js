
require('dotenv').config()
const express = require('express')
const  mongoose = require('mongoose')
var cors = require('cors')
const multer = require('multer')
var path = require('path')

const EmployeeRouter = require('./router/Employeerouter')
const UserRouter = require('./router/Userouter')



const bodyParser = require('body-parser');


const app = express()
app.use(express.json())
app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json());// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.get('/',(req,res)=>{
    res.json("'Hello, this is the root route!'")
})

app.use('/employees', EmployeeRouter)
app.use('/users',UserRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`portal running on ${process.env.PORT}`)
        })
    })
    .catch((err) => console.log(err))

