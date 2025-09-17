import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { fetchQuizById } from '../services/api';
import QuestionCard from '../components/QuestionCard';

const QuizDetails = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const loadQuiz = async () => {
            try {
                const data = await fetchQuizById(id);
                const questions = data.questions.map((q) => ({
                    ...q,
                    options: q.options || [],
                    correctAnswer: q.correctAnswer || (q.type === 'checkbox' ? [] : null),
                }));
                setQuiz({ ...data, questions });
            } catch (err) {
                console.error(err);
            }
        };

        loadQuiz();
    }, [id]);

    if (!quiz) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" mb={3} color="primary">
                Quiz Name: {quiz.title}
            </Typography>

            {quiz.questions.map((q, index) => (
                <QuestionCard key={index} question={q} index={index} />
            ))}
        </Box>
    );
};

export default QuizDetails;
