const quizService = require('../services/QuizService');

class QuizController {
    getAllQuizzes = async (req, res) => {
        try {
            const quizzes = await quizService.getAllQuizzes();
            res.json(quizzes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch quizzes' });
        }
    };

    getQuizById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const quiz = await quizService.getQuizById(id);
            if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

            const questions = quiz.questions.map(q => ({
                ...q,
                options: q.options ? JSON.parse(q.options) : [],
                correctAnswer: q.correctAnswer
                    ? q.type === 'checkbox'
                        ? JSON.parse(q.correctAnswer)
                        : q.correctAnswer
                    : null
            }));

            res.json({ ...quiz, questions });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch quiz' });
        }
    };

    createQuiz = async (req, res) => {
        try {
            const { title, questions } = req.body;
            if (!title || !questions || !Array.isArray(questions)) {
                return res.status(400).json({ error: 'Invalid payload' });
            }

            const quiz = await quizService.createQuiz({ title, questions });
            res.status(201).json(quiz);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create quiz' });
        }
    };

    deleteQuiz = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const success = await quizService.deleteQuiz(id);
            if (!success) return res.status(404).json({ error: 'Quiz not found' });
            res.json({ message: 'Quiz deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete quiz' });
        }
    };
}

module.exports = new QuizController();
