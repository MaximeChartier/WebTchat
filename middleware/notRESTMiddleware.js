module.exports = (req, res, next) => {
    switch (res.statusCode){
        case 404: 
            res.json({
                code: res.statusCode,
                error: "not found"
            })
        break;
        case 400: 
        res.json({
            code: res.statusCode,
            error: "bad request"
        })
    break;
    }
    return res.end()
}