const router = require('express').Router()
const Controller = require('../controllers/user.js')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/googleSign', Controller.googleSign)

module.exports = router