const data = require('../../sql3-data')

module.exports = async (req, res) => {
  const users = await data.getUsers()
  res.writeHead(200)
  res.end(JSON.stringify(users))
}