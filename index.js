require('dotenv').config()
const express = require('express')
const app = express()
const Beer = require("./models/beer")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get("/api/beers", (request, response) => {
  Beer.find({}).then(beers => {
    response.json(beers)
  })
})

app.get('/api/beers/:date', (request, response) => {
  const date = request.params.date
  Beer.findOne({date: date}).then(beer => {
  if (beer) {
    response.json(beer)
  } else {
    response.status(404).end()
  }
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

app.post('/api/beers', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const beer = new Beer({
    content: body.content,
    date: body.date,
  })


  beer.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put("/api/beers/:date", (request, response) => {
  const body = request.body

  const beer = {
    content: body.content,
    date: body.date
  }
  Beer.findOneAndUpdate({date: request.params.date}, beer, { new: true })
    .then(updatedBeer => {
      response.json(updatedBeer)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
