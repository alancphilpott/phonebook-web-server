const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (_, res) => {
  res.send('<h1>Hello World</h1>')
})

app.listen(3001, () => console.log(`Server Listening on Port 3001`))
