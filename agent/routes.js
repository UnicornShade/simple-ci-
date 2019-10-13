const { Router } = require('express')

const buildController = require('./controllers/build')

const router = Router()

router.get('/', (req, res) => res.send(200))

router.post('/build', buildController.perform)

module.exports = router
