var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/Users/UserController');

var { authenticateToken } = require('../controllers/Auth/AuthController');

router.get('/profile', authenticateToken, UsersController.profile);
router.put('/update_info', authenticateToken, UsersController.updatePersonalInformation);
router.post('/change_password', authenticateToken, UsersController.changePassword);

module.exports = router;