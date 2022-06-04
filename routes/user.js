const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('passport')

router.get('/login',userController.getLogin)

router.get('/register',userController.getRegister)

router.post('/login',
passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect : '/users/login',
    failureFlash : true,
    }),
userController.postLogin)

router.post('/register',userController.postRegister)




module.exports = router