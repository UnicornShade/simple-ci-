const { Router } = require('express')

const agentController = require('./controllers/agent')
const buildController = require('./controllers/build')
const indexController = require('./controllers/index')

const router = Router()

router.get('/', indexController.show)

router.post('/build', buildController.run)
router.get('/build/:buildId', buildController.show)

router.post('/notify_agent', agentController.notifyAgent)
router.post('/notify_build_result', agentController.notifyBuildResult)

module.exports = router
