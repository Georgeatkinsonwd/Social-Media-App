const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const connectDB = require('./config/db')

dotenv.config({path: './config/.env'})

connectDB()


app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT ${process.env.port}`)
})