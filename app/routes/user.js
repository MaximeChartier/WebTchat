const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middleware/auth').auth

router.get('/', auth, userController.index);
router.post('/', userController.create);
router.get('/:userId', auth, userController.show);
router.get('/:userId/messages', auth, userController.showMessages);
router.put('/:userId', auth, userController.update);
router.delete('/:userId', auth, userController.delete);

module.exports = router;
