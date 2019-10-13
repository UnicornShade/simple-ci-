const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')

const serverRegistration = require('./services/serverRegistration')
const error = require('./middleware/errorHandler')
const routes = require('./routes')

dotenv.config({ path: path.resolve(__dirname, '.env') })

const { HOST, PORT } = process.env
const [argPort] = process.argv.splice(2)
const AGENT_PORT = argPort || PORT

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(error.responseError())

app.use('/', routes)

app.use((_, res) => res.error('Not found', 404))
app.use(error.errorHandler())

app.listen(AGENT_PORT, HOST, async () => {
  try {
    await serverRegistration(HOST, AGENT_PORT)

    console.log(`CI Server running on http://${HOST}:${AGENT_PORT}/`)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})
