const express = require('express')
const app = express()

app.use(express.json())


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

app.get("/", (request, response) => {
  response.send("<h1>Welcome to Hig's Backend</h1>")
})

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

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const beer = {
    content: body.content,
    date: new Date(),
  }

  beers = beers.concat(beer)

  console.log(beer)
  response.json(beer)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
