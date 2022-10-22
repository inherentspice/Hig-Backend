require('dotenv').config()
const express = require('express')
const app = express()
const Beer = require("./models/beer")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


let beers = [
  {
    id: 1,
    content: {nah: 17, alright: 1, yeah: 28},
    date: "2022-10-20",
  },
  {
    id: 2,
    content: {nah: 27, alright: 10, yeah: 2},
    date: "2022-10-19",
  },
  {
    id: 3,
    content: {nah: 0, alright: 2, yeah: 0},
    date: "2022-10-18",
  }
]

app.get("/api/beers", (request, response) => {
  response.json(beers)
})

app.get('/api/beers/:date', (request, response) => {
  const date = request.params.date
  const beer = beers.find(beer => beer.date === date)
  if (beer) {
    response.json(beer)
  } else {
    response.status(404).end()
  }
})

app.post('/api/beers', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const beer = new Beer ({
    content: body.content,
    date: body.date,
  })


  beer.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
