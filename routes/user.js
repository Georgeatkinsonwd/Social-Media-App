const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/login',userController.getLogin)

router.get('/register',userController.getRegister)



module.exports = router