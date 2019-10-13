const projectBuilder = require('../services/projectBuilder')

exports.perform = async (req, res) => {
  const { repo, command, buildId, hash } = req.body

  projectBuilder({ repo, buildId, command, hash })

  res.sendStatus(200)
}
