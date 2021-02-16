const { json } = require('express')
const userRepository = require('../repository/userRepository.js')

getAll_ = (req, res, next)=>{
    res
        .json(userRepository.read())
    return res.end()
}

get_ = (req, res, next)=>{
    const id = req.params.id
    const user = userRepository.read(id)
    if(user){
        res
            .json(user)
        return res.end()
    }else{
        res
            .status(404)
    }
    //default : use next middleware
    return next()
}

put_ = (req, res, next)=>{    //filter body keys
    const {
        username, 
        email,
        location,
    } = req.body
    const user = userRepository.save({
        id: req.params.id,
        username, 
        email, 
        location
    })
    if(user){
        res.json(user).end()
    }else{
        res.status(404)
        next()
    }
    
}

post_ = (req, res, next)=>{
    //filter body keys
    const {
        username, 
        email,
        location,
    } = req.body
    if(
        !username || 
        !email ||
        !location 
    ){
        res.status(400)
        return next()
    }
    const newUser = userRepository.save({
        username, 
        email, 
        location
    })
    res.status(201).json(newUser).end()
}

delete_ = (req, res, next)=>{
    const id = req.params.id
    const deleted = userRepository.delete_(id)
    if(deleted){
        res
            .status(204)
        return res.end()
    }else{
        res
            .status(404)
    }
    return next()
}

module.exports = {
    getAll_,
    get_,
    put_,
    post_,
    delete_
}