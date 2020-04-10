const router = require('express').Router()
const Controller = require('../controllers/task')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.delete('/:id', authorization, Controller.delete)
router.put('/:id', authorization, Controller.put)

module.exports = router