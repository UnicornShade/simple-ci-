const { getBuilds } = require('../services/db')

exports.show = (req, res) => {
  const builds = getBuilds()

  res.render('index', { builds })
}
