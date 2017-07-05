const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const notes = []

app.use(bodyParser.json())
