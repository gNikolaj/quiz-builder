require('dotenv').config();

const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.use('/quizzes', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
