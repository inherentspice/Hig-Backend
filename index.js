const http = require('http')

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end(JSON.stringify(beers))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
