const express = require('express')
const morgan = require('morgan')
const app = express()

let contacts = require('./sampleData')[0].contacts

const contactAlreadyExists = (name) => {
  const match = contacts.filter((c) => c.name.toLowerCase() === name.toLowerCase())
  return match.length > 0 ? true : false
}

morgan.token('data', (req, _) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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

app.post('/api/contacts', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) return res.status(400).json({ error: 'Missing Name or Number' })
  else if (contactAlreadyExists(body.name))
    return res.status(400).json({ error: `${body.name} Already Exists` })

  const contact = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 999 + 1)
  }

  contacts = contacts.concat(contact)

  res.json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  contacts = contacts.filter((c) => c.id !== id)

  res.send(204).end()
})

app.listen(3001, () => console.log(`Server Listening on Port 3001`))
