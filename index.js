const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Contact = require('./models/contact')

morgan.token('data', (req, _) => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') res.status(400).send({ error: 'Malformed ID' })
  else if (error.name === 'ValidationError') res.status(400).json({ error: error.message })

  next()
}

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

app.get('/info', (_, res) => {
  Contact.find({}).then((contacts) => {
    const markup = `<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`
    res.send(markup)
  })
})

app.get('/api/contacts', (_, res) => {
  Contact.find({}).then((contacts) => res.json(contacts))
})

app.get('/api/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) return res.json(contact)
      else res.status(404).end()
    })
    .catch((err) => next(err))
})

app.post('/api/contacts', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number) return res.status(400).json({ error: 'Missing Name or Number' })

  const newContact = new Contact({ name, number })

  newContact
    .save()
    .then((savedContact) => res.json(savedContact))
    .catch((err) => next(err))
})

app.put('/api/contacts/:id', (req, res, next) => {
  const id = req.params.id
  const name = req.body.name
  const number = req.body.number

  const contact = { id, name, number }

  Contact.findByIdAndUpdate(id, contact, { new: true, runValidators: true, context: 'query' })
    .then((updatedContact) => res.json(updatedContact))
    .catch((err) => next(err))
})

app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((_) => res.status(204).end())
    .catch((err) => next(err))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`))
