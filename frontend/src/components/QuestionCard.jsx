import React from 'react';

import { Box, Card, CardContent, Typography, Chip } from '@mui/material';

const QuestionCard = ({ question, index }) => {
    const { type, questionText, options = [], correctAnswer = null } = question;

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" mb={1}>
                    {index + 1}. {questionText}
                </Typography>

                {type === 'input' && (
                    <Box sx={{ mt: 1 }}>
                        <Typography color="text.secondary">
                            Answer: {correctAnswer || '[no correct answer provided]'}
                        </Typography>
                    </Box>
                )}

                {type === 'boolean' && (
                    <Box
                        sx={{
                            mt: 1,
                            p: 1.5,
                            borderRadius: 1,
                            bgcolor: correctAnswer === 'true' ? '#d0f0c0' : '#f9d0d0',
                            display: 'inline-block',
                        }}
                    >
                        <Typography>{correctAnswer === 'true' ? '✅ Correct' : '❌ Incorrect'}</Typography>
                    </Box>
                )}

                {type === 'checkbox' && (
                    <Box sx={{ mt: 1 }}>
                        {options &&
                            options.map((opt, i) => (
                                <Card
                                    key={i}
                                    sx={{
                                        mb: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        bgcolor: correctAnswer.includes(opt.text) ? '#d0f0c0' : '#f9f9f9',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography>{opt.text}</Typography>
                                    {correctAnswer.includes(opt.text) && (
                                        <Chip label="Correct" color="success" size="small" />
                                    )}
                                </Card>
                            ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default QuestionCard;
