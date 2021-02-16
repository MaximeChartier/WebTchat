
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController.js')

router
    .get('/', userController.getAll_)
    .get('/:id', userController.get_)
    .post('/:id', userController.post_)
    .put('/:id', userController.post_)
    .delete('/:id', userController.post_)

module.exports = router;