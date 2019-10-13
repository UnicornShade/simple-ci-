const fetch = require('node-fetch')

module.exports = (host, port) => {
  return fetch(`${process.env.SERVER_HOST}/notify_agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ host, port })
  })
}
