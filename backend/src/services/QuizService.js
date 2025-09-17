const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class QuizService {
    async getAllQuizzes() {
        const quizzes = await prisma.quiz.findMany({
            include: { questions: true },
        });
        return quizzes.map(q => ({
            id: q.id,
            title: q.title,
            questionsCount: q.questions.length
        }));
    }

    async getQuizById(id) {
        return prisma.quiz.findUnique({
            where: { id: Number(id) },
            include: { questions: true },
        });
    }

    async createQuiz({ title, questions }) {
        return prisma.quiz.create({
            data: {
                title,
                questions: {
                    create: questions.map(q => ({
                        questionText: q.questionText,
                        type: q.type,
                        options: q.options?.length ? JSON.stringify(q.options) : null,
                        correctAnswer: q.correctAnswer
                            ? q.type === 'checkbox'
                                ? JSON.stringify(q.correctAnswer)
                                : String(q.correctAnswer)
                            : null
                    }))
                }
            },
            include: { questions: true }
        });
    }

    async deleteQuiz(id) {
        // спочатку видаляємо питання
        await prisma.question.deleteMany({
            where: { quizId: Number(id) }
        });

        // потім квіз
        const quiz = await prisma.quiz.delete({
            where: { id: Number(id) },
        });

        return quiz ? true : false;
    }
}

module.exports = new QuizService();
