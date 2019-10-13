const { getBuild } = require('../services/db')

exports.run = (req, res) => {
  res.send(200)
}

exports.show = (req, res) => {
  const { buildId } = req.params

  const build = getBuild(buildId)

  res.render('build', { build })
}
