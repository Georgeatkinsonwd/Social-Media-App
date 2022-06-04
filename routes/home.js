const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const {ensureAuthenticated} = require("../config/auth.js")

router.get('/',homeController.getIndex)
router.get('/dashboard',ensureAuthenticated, homeController.getDashboard)

module.exports = router