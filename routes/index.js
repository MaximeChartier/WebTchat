function index(req, res, params){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('use /hello?name=<yourname>\rto get welcome\r\r');
    res.write('use /hello?name=maxime \rto get intro about me');
    res.end();
}

module.exports = index