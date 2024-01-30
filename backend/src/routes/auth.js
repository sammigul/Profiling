var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/Auth/AuthController');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.delete('/logout', AuthController.logout);

router.post('/token', AuthController.generateNewAccessToken);

router.post('/verify_token', AuthController.verifyToken);

module.exports = router;