const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('passport')

router.get('/login',userController.getLogin)

router.get('/register',userController.getRegister)

// can't get working with controller atm
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

router.post('/register',userController.postRegister)


router.get('/dashboard',userController.getDashboard)




module.exports = router