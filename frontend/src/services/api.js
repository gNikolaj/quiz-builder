import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchQuizzes = async () => {
    const res = await axios.get(`${API_URL}/quizzes`);
    return res.data;
};

export const fetchQuizById = async (id) => {
    const res = await axios.get(`${API_URL}/quizzes/${id}`);
    return res.data;
};

export const createQuiz = async (quiz) => {
    const res = await axios.post(`${API_URL}/quizzes`, quiz);
    return res.data;
};

export const deleteQuiz = async (id) => {
    const res = await axios.delete(`${API_URL}/quizzes/${id}`);
    return res.data;
};
