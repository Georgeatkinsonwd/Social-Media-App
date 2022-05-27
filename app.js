const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')
const connectDB = require('./config/db')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')

dotenv.config({path: './config/config.env'})

connectDB()

// middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
// app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/', homeRoutes)
app.use('/users',userRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT ${process.env.port}`)
})