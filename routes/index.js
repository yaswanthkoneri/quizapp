var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var AuthController = require('../controllers/auth');
var QuestionController = require('../controllers/question');
var ResultController = require('../controllers/result');


router.post('/register',UserController.hasCreateUserValidFields,UserController.createUser);
router.post('/login',AuthController.isPasswordAndUserMatch,AuthController.login);

router.post('/questions/default',QuestionController.defaultQuestions)
router.get('/questions',QuestionController.getQuestions)
router.get('/questions/:id',QuestionController.getQuestionById)
router.delete('/questions/:id',QuestionController.removeQuestion)


router.put('/result',ResultController.updateResult)
router.post('/result/new',ResultController.createResult)
router.get('/result/leaderboard',ResultController.getLeaderboard)

module.exports = router;
