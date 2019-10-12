exports.notifyAgent = (req, res) => {
  const { host, port } = req.body

  res.send(200)
}

exports.notifyBuildResult = (req, res) => {
  const { id, status, stdout, stderr } = req.body

  res.send(200)
}
