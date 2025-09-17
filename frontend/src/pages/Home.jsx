import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Box } from '@mui/material';

import { deleteQuiz, fetchQuizzes } from '../services/api';

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);

    const loadQuizzes = async () => {
        try {
            const data = await fetchQuizzes();
            setQuizzes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadQuizzes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this quiz?')) return;

        try {
            await deleteQuiz(id);
            setQuizzes((prev) => prev.filter((q) => q.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete quiz');
        }
    };

    if (!quizzes.length) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Available Quizzes
                </Typography>
                <Typography>No quizzes yet.</Typography>
                <Button variant="contained" color="primary" component={Link} to="/create" sx={{ mt: 2 }}>
                    Create Quiz
                </Button>
            </Box>
        );
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom align="center">
                Available Quizzes
            </Typography>
            <Grid container spacing={3}>
                {quizzes &&
                    quizzes.map((quiz) => (
                        <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{quiz.title}</Typography>
                                    <Typography color="text.secondary">
                                        {quiz.questionsCount} question{quiz.questionsCount !== 1 ? 's' : ''}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between' }}>
                                    <Button size="small" variant="contained" component={Link} to={`/quiz/${quiz.id}`}>
                                        View
                                    </Button>
                                    <IconButton color="error" onClick={() => handleDelete(quiz.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default Home;
