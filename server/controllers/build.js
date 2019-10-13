const fetch = require('node-fetch')

const { getBuild } = require('../services/db')
const agent = require('../services/agent')

exports.run = async (req, res) => {
  const { hash, command } = req.body
  const repo = process.env.REPOSITORY_ADDRESS

  if (!hash || !command) res.error('All fields must be filled', 400)

  const { address, id: buildId } = agent.registerBuild()

  try {
    console.log('Delegate to ', address)
    await fetch(`${address}/build`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buildId, repo, command, hash })
    })

    res.redirect('/')
  } catch (e) {
    agent.removeBuild(buildId)
    res.error(e, 500)
  }
}

exports.show = (req, res) => {
  const { buildId } = req.params

  const build = getBuild(buildId)

  res.render('build', { build })
}
