const data = require('../../sql3-data')

module.exports = (req, res) => {
  const id = parseInt(req.url.split('/')[2])
  let body = ''

  req.on('data', chunk => {
    body += chunk
  })

  req.on('end', async () => {
    const parseBody = new URLSearchParams(body)
    const name = parseBody.get('name')
    const age = parseBody.get('age')

    if (name && age) {
      const user = await data.updateUser(id, { name: name, age: age })
      res.writeHead(201)
      res.end(JSON.stringify(user))
    } else {
      res.writeHead(400)
      res.end(JSON.stringify({message: 'Name or age are required'}))
    }
  })
}