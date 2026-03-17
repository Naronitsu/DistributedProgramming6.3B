console.log('Hello Distributed World!')

const http = require('http')

const server = http.createServer((req, res) => {
  let url = req.url
  if (url === '/') {
    res.write('Welcome to homepage!')
  } else if (url === '/about') {
    res.write('Welcome to about page!')
  } else if (url === '/course') {
    res.write('Welcome to course page!')
  } else {
    res.write('Page not found!')
  }
  res.end()
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})
