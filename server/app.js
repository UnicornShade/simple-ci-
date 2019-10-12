const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const error = require('./middleware/errorHandler')

const { notifyAgent } = require('./controllers/notifyAgent')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(error.responseError())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/build/:buildId', (req, res) => {
  const { buildId } = req.params

  res.render('build', { buildId })
})

app.post('/notify_agent', notifyAgent)

app.post('/notify_build_result', (req, res) => { })


app.use((_, res) => res.error('Not found', 404))
app.use(error.errorHandler())

app.listen(3000, 'localhost', () => {
  console.log(`CI Server running on http://localhost:3000/`);
})
