const express = require('express')
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/build/:buildId', (req, res) => {
  const { buildId } = req.params

  res.render('build', { buildId })
})

app.get('/notify_agent', (req, res) => { })

app.get('/notify_build_result', (req, res) => { })

app.listen(3000, 'localhost', () => {
  console.log(`CI Server running on http://localhost:3000/`);
})
