const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
require("dotenv").config()
connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


app.use('/api/auth',require('./routes/auth') )
app.use('/api/notes',require('./routes/notes') )

app.get('/', (req, res) => {
  res.send('App is working Fine')
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})