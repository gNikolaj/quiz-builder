import React from 'react';

import {
    Box,
    Select,
    Switch,
    Button,
    MenuItem,
    Checkbox,
    TextField,
    InputLabel,
    IconButton,
    Typography,
    FormControl,
    FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionEditor = ({
    index,
    question,
    addOption,
    removeOption,
    removeQuestion,
    setInputCorrect,
    updateOptionText,
    setBooleanCorrect,
    updateQuestionType,
    updateQuestionText,
    toggleOptionCorrect,
}) => {
    return (
        <Box sx={{ border: '1px solid #ccc', p: 2, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Question {index + 1}</Typography>
                <IconButton onClick={() => removeQuestion(index)}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            <TextField
                label="Question Text"
                fullWidth
                value={question.questionText}
                onChange={(e) => updateQuestionText(index, e.target.value)}
                sx={{ mb: 1 }}
            />

            <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Type</InputLabel>
                <Select value={question.type} label="Type" onChange={(e) => updateQuestionType(index, e.target.value)}>
                    <MenuItem value="input">Input</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                    <MenuItem value="checkbox">Checkbox</MenuItem>
                </Select>
            </FormControl>

            {question.type === 'boolean' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>Correct answer:</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={question.correctAnswer === true}
                                onChange={(e) => setBooleanCorrect(index, e.target.checked)}
                            />
                        }
                        label="True"
                    />
                </Box>
            )}

            {question.type === 'input' && (
                <TextField
                    label="Correct answer (optional)"
                    fullWidth
                    value={question.correctAnswer ?? ''}
                    onChange={(e) => setInputCorrect(index, e.target.value)}
                    sx={{ mt: 1 }}
                />
            )}

            {question.type === 'checkbox' && (
                <Box sx={{ mt: 1 }}>
                    {question.options.map((opt, oIndex) => (
                        <Box key={oIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Checkbox checked={!!opt.isCorrect} onChange={() => toggleOptionCorrect(index, oIndex)} />
                            <TextField
                                value={opt.text}
                                onChange={(e) => updateOptionText(index, oIndex, e.target.value)}
                                sx={{ flex: 1, mr: 1 }}
                            />
                            <IconButton onClick={() => removeOption(index, oIndex)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button variant="outlined" onClick={() => addOption(index)}>
                        Add Option
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default QuestionEditor;
