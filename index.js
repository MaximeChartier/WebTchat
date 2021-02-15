const http = require('http')
const handles = require('./handles')
const server = http.createServer(handles);
server.listen(8080)