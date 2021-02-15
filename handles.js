const url = require('url');
const qs = require('querystring');

const index = require('./routes');
const notFound = require('./routes/404');
const hello = require('./routes/hello');

function serverHandle (req, res) {
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = qs.parse(route.query);

  switch (path){
        case '/':
            index(req, res, params)
            break;
        case '/hello':
            hello(req, res, params)
            break;
        default:
            notFound(req, res, params)
            break;
  }
}

module.exports = serverHandle
