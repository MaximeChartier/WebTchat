
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController.js')

router
    .get('/', userController.getAll_)
    .get('/:id(\\d+)', userController.get_)
    .post('/', userController.post_)
    .put('/:id(\\d+)', userController.put_)
    .delete('/:id(\\d+)', userController.delete_)

module.exports = router;