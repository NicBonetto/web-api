const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const notes = []
let nextID = 0

app.use(bodyParser.json())

app.post('/notes', (req, res) => {
  const newNote = req.body
  newNote.id = nextID + 1
  notes.push(newNote)
  res.sendStatus(201)
  nextID++
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.put('/notes/:id', (req, res) => {
  for (let i = 0; i < notes.length; i++) {
    let saveId
    if (notes[i].id === Number(req.params.id)) {
      saveId = notes[i].id
      notes.splice(i, 1, req.body)
      notes[i].id = saveId
      return res.sendStatus(200)
    }
  }
  res.sendStatus(404)
})

app.delete('/notes/:id', (req, res) => {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === Number(req.params.id)) {
      notes.splice(notes[i], 1)
      return res.sendStatus(204)
    }
  }
  res.sendStatus(404)
})

app.listen(3000)
