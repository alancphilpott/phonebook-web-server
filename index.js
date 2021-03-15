const express = require('express')
const app = express()

let contacts = require('./sampleData')[0].contacts

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

app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  const contact = contacts.find((c) => c.id === id)
  console.log(contact)

  if (contact) return res.json(contact)
  else res.status(404).end()
})

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  contacts = contacts.filter((c) => c.id !== id)

  res.send(204).end()
})

app.listen(3001, () => console.log(`Server Listening on Port 3001`))
