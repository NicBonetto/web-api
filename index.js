const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const notes = []
let notesIndex = 0

function resetID(deletedIndex) {
  for (let i = notes.length - 1; i > deletedIndex; i--) {
    notes[i].id -= 1
  }
}

app.use(bodyParser.json())

app.post('/notes', (req, res) => {
  const newNote = req.body
  newNote.id = notesIndex + 1
  notes.push(newNote)
  res.sendStatus(201)
  notesIndex++
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
  notes.forEach((element, index) => {
    if (element.id === Number(req.params.id)) {
      resetID(index)
      notes.splice(index, 1)
    }
  })
  res.sendStatus(204)
})

app.listen(3000)
