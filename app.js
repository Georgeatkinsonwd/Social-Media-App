const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const passport = require('passport')
const connectDB = require('./config/db')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')


dotenv.config({path: './config/config.env'})

// passport config
require("./config/passport")(passport)

connectDB()


// session 
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));

   //passport middleware
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
// app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(flash())

app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
  next();
  })




app.use('/', homeRoutes)
app.use('/users',userRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT ${process.env.port}`)
})