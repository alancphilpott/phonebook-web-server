const express = require('express')
const app = express()
const contacts = require('./sampleData')[0].contacts

app.use(express.json())

app.get('/', (_, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/info', (_, res) => {
  const markup = `<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`
  res.send(markup)
})

app.get('/api/contacts', (_, res) => {
  res.json(contacts)
})

app.listen(3001, () => console.log(`Server Listening on Port 3001`))
