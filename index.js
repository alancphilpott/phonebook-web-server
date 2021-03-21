const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Contact = require('./models/contact')

morgan.token('data', (req, _) => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, req, res, next) => {
  console.log(req)

  error.name === 'CastError' ? res.status(400).send({ error: 'Malformed ID' }) : next()
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

app.post('/api/contacts', (req, res) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number) return res.status(400).json({ error: 'Missing Name or Number' })

  const newContact = new Contact({ name, number })

  newContact.save().then((savedContact) => res.json(savedContact))
})

app.put('/api/contacts/:id', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  const contact = { name, number }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
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
