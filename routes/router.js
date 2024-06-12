const url = require('url');
const userRoutes = require('./userRoutes/userRoutes');

const routerHandler = (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  
  if (path.startsWith('/users')) {
    userRoutes(req, res);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({message: 'Route not found'}));
  }
}

module.exports = routerHandler