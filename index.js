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
  notes.forEach((element, index) => {
    let saveId
    if (element.id === Number(req.params.id)) {
      saveId = element.id
      notes.splice(index, 1, req.body)
      notes[index].id = saveId
    }
  })
  res.sendStatus(200)
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
