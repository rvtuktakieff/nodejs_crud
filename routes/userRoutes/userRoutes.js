const url = require('url');
const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const getUser = require('./getUser')
const getUsers = require('./getUsers')
const updatedUser = require('./updateUser')

const userRoutes = (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const method = req.method;

  if (path === '/users') {
    if (method === 'GET') getUsers(req, res)
    if (method === 'POST') createUser(req, res)
  } else if (path.startsWith('/users')) {
    if (method === 'GET') getUser(req, res)
    if (method === 'PUT') updatedUser(req, res)
    if (method === 'DELETE') deleteUser(req, res)
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({message: 'Route not found in users!'}))
  }
}

module.exports = userRoutes