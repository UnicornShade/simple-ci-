const agent = require('../services/agent')

exports.notifyAgent = (req, res) => {
  const { host, port } = req.body

  const address = `http://${host}:${port}`

  agent.register(address)

  res.sendStatus(200)
}

exports.notifyBuildResult = (req, res) => {
  const { buildId, status, stdout, stderr } = req.body

  res.sendStatus(200)
}
