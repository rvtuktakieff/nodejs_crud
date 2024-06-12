const http = require('http');
const routerHandler = require('./routes/router')

const server = http.createServer((req,res) => {
  routerHandler(req, res)
})

server.listen(3000)