const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const notes = []

app.use(bodyParser.json())

app.post('/notes', (req, res) => {
  notes.push(req.body)
  res.sendStatus(201)
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.put('/notes/:id', (req, res) => {
  notes.forEach((element, index) => {
    if (element.id === Number(req.params.id)) {
      notes.splice(index, 1, req.body)
    }
  })
  res.sendStatus(200)
})

app.listen(3000)
