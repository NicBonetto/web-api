const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const notes = []
let notesIndex = 0

app.use(bodyParser.json())

app.post('/notes', (req, res) => {
  notes.push(req.body)
  notes[notesIndex].id = notesIndex + 1
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

app.listen(3000)
