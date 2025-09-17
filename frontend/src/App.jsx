import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Container } from '@mui/material';

import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import QuizDetails from './pages/QuizDetails';

import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Container sx={{ mt: 2 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateQuiz />} />
                    <Route path="/quiz/:id" element={<QuizDetails />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
