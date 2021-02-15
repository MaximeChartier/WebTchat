function notFound(req, res, params){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('not found');
    res.end();
}

module.exports = notFound