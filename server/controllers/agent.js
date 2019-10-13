const agent = require('../services/agent')
const db = require('../services/db')

exports.notifyAgent = (req, res) => {
  const { host, port } = req.body

  const address = `http://${host}:${port}`

  agent.register(address)

  res.sendStatus(200)
}

exports.notifyBuildResult = (req, res) => {
  const { buildId, status, stdout, stderr } = req.body

  const { startTime, endTime } = agent.removeBuild(buildId)

  db.addBuild({ id: buildId, status, stdout, stderr, startTime, endTime })

  res.sendStatus(200)
}
