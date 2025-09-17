const express = require('express');
const router = express.Router();
const quizController = require('../controllers/QuizController');

router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/', quizController.createQuiz);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
