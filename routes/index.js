var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var AuthController = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',UserController.hasCreateUserValidFields,UserController.createUser);
router.post('/login',AuthController.isPasswordAndUserMatch,AuthController.login)

module.exports = router;
