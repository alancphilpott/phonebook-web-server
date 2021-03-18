const mongoose = require('mongoose')

const args = process.argv

if (args.length < 3) {
  console.log('Provide a PW as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = args[2]

const url = `mongodb+srv://alanphil:${password}@castify.000od.mongodb.net/phonebook-app?retryWrites=true&w=majority`

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

if (args[3] && args[4]) {
  const contact = new Contact({
    name: args[3],
    number: args[4]
  })

  contact.save().then((result) => {
    console.log(`Added ${result.name} Number ${result.number} To Phonebook`)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then((contacts) => {
    contacts.forEach((contact) => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
