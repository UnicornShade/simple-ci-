const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const error = require('./middleware/errorHandler')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(error.responseError())

app.use('/', routes)

app.use((_, res) => res.error('Not found', 404))
app.use(error.errorHandler())

app.listen(3000, 'localhost', () => {
  console.log(`CI Server running on http://localhost:3000/`);
})
