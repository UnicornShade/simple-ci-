const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')

const db = require('./services/db')

dotenv.config({ path: path.resolve(__dirname, '.env') })

const error = require('./middleware/errorHandler')
const routes = require('./routes')

const { HOST, PORT } = process.env

db.init()
const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(error.responseError())

app.use('/', routes)

app.use((_, res) => res.error('Not found', 404))
app.use(error.errorHandler())

app.listen(PORT, HOST, () => {
  console.log(`CI Server running on http://${HOST}:${PORT}/`)
})
