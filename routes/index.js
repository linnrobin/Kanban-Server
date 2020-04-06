const router = require('express').Router()
const usersRoutes = require('./users')
const tasksRoutes = require('./tasks')

router.get('/', (req, res) => res.status(200).json({ msg: "Successfully connected to server" }))
router.use('/users', usersRoutes)
router.use('/tasks', tasksRoutes)

module.exports = router