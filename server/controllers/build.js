exports.run = (req, res) => {
  res.send(200)
}

exports.show = (req, res) => {
  const { buildId } = req.params

  res.render('build', { result: 'build result text', buildId })
}
