const express = require('express')
const app = express()
const contacts = require('./sampleData')[0].contacts

app.use(express.json())

app.get('/', (_, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/contacts', (req, res) => {
  res.json(contacts)
})

app.listen(3001, () => console.log(`Server Listening on Port 3001`))
