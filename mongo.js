require('dotenv').config()
const mongoose = require('mongoose')

const args = process.argv
const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = new mongoose.model('Contact', contactSchema)

if (args[2] && args[3]) {
  const name = args[2]
  const number = args[3]

  const contact = new Contact({ name, number })

  contact.save().then((result) => {
    console.log(`Added ${result.name} Number ${result.number} To Phonebook`)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then((contacts) => {
    console.log('phonebook:')
    contacts.forEach((contact) => console.log(contact.name, contact.number))
    mongoose.connection.close()
  })
}
