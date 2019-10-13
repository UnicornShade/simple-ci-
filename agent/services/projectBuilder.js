const { exec } = require('child_process')
const path = require('path')
const git = require('simple-git')
const fetch = require('node-fetch')
const rimraf = require('rimraf')

module.exports = async ({ repo, buildId, command, hash }) => {
  const repoPath = path.resolve(__dirname, '../builds', buildId)

  try {
    //todo создавать папку заранее и задать ее как рабочую для гита
    await git().clone(repo, repoPath)
    await git(repoPath).checkout(hash)

    const { status, stdout, stderr } = await runCommand(command, repoPath)

    notifyServer({ status, stdout, stderr, buildId })
  } catch (e) {
    notifyServer({ buildId, status: 'fail', stderr: e.message })
  } finally {
    rimraf(repoPath, e => console.error(e))
  }
}

const runCommand = (command, cwd) => new Promise(resolve => {
  exec(command, { cwd }, (err, stdout, stderr) => {
    const status = err === null ? 'success' : 'fail'

    resolve({ status, stdout, stderr })
  })
})

const notifyServer = ({ buildId, stderr = '', stdout = '', status }) => {
  return fetch(`${process.env.SERVER_HOST}/notify_build_result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buildId, status, stderr, stdout })
  }).catch(error => {
    console.error(error)
    process.exit(1)
  })
}
