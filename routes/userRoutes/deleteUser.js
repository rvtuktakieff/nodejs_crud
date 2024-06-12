const data = require('../../sql3-data')

module.exports = async (req, res) => {
  const id = parseInt(req.url.split('/')[2])
  const deletedUser = await data.deleteUser(id) 
  
  if (deletedUser) {
    res.writeHead(204)
    res.end()
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({message: 'User not found'}));
  }
}