import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuizEditor } from '../hooks/useQuizEditor';

import { Box, Button, TextField, Typography } from '@mui/material';

import { createQuiz } from '../services/api';
import QuestionEditor from '../components/QuestionEditor';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const {
        title,
        setTitle,
        validate,
        questions,
        addOption,
        addQuestion,
        removeOption,
        removeQuestion,
        setInputCorrect,
        updateOptionText,
        setBooleanCorrect,
        updateQuestionType,
        updateQuestionText,
        toggleOptionCorrect,
    } = useQuizEditor();

    const handleSubmit = async () => {
        if (!validate()) return;

        const payloadQuestions = questions.map((q) => {
            if (q.type === 'checkbox') {
                const correctAnswer = q.options.filter((o) => o.isCorrect).map((o) => o.text);
                return { ...q, correctAnswer };
            } else if (q.type === 'boolean') {
                return { ...q, options: ['True', 'False'] };
            } else {
                return q;
            }
        });

        try {
            await createQuiz({ title, questions: payloadQuestions });
            alert('Quiz created!');
            navigate('/');
        } catch (err) {
            alert('Failed to create quiz: ' + err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
            <Typography variant="h4" mb={2}>
                Create Quiz
            </Typography>
            <TextField
                label="Quiz Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />

            {questions &&
                questions.map((q, index) => (
                    <QuestionEditor
                        key={index}
                        question={q}
                        index={index}
                        updateQuestionText={updateQuestionText}
                        updateQuestionType={updateQuestionType}
                        setBooleanCorrect={setBooleanCorrect}
                        setInputCorrect={setInputCorrect}
                        addOption={addOption}
                        updateOptionText={updateOptionText}
                        toggleOptionCorrect={toggleOptionCorrect}
                        removeOption={removeOption}
                        removeQuestion={removeQuestion}
                    />
                ))}

            <Button variant="contained" onClick={addQuestion} sx={{ mr: 2 }}>
                Add Question
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
                Submit Quiz
            </Button>
        </Box>
    );
};

export default CreateQuiz;
