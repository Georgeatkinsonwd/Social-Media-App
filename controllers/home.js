const express = require('express')
const passport = require('passport')
const User = require('../models/User')



module.exports = {
    getIndex: (req,res)=>{
        res.render('welcome.ejs')
    },
    getDashboard:(req,res)=>{
        res.render('dashboard.ejs',{
            user: req.user
        })
    },
    
}