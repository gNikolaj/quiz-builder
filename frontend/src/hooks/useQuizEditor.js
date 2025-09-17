import { useState } from 'react';

export const useQuizEditor = (initialTitle = '', initialQuestions = []) => {
    const [title, setTitle] = useState(initialTitle);
    const [questions, setQuestions] = useState(initialQuestions);

    const addQuestion = () => {
        setQuestions((prev) => [...prev, { type: 'input', questionText: '', options: [], correctAnswer: null }]);
    };

    const removeQuestion = (index) => setQuestions((prev) => prev.filter((_, i) => i !== index));

    const updateQuestionText = (i, text) =>
        setQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, questionText: text } : q)));

    const updateQuestionType = (i, type) =>
        setQuestions((prev) =>
            prev.map((q, idx) =>
                idx === i
                    ? {
                          ...q,
                          type,
                          options: type === 'checkbox' ? [{ text: '', isCorrect: false }] : [],
                          correctAnswer: type === 'checkbox' ? [] : null,
                      }
                    : q,
            ),
        );

    const setBooleanCorrect = (i, value) =>
        setQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, correctAnswer: value } : q)));

    const setInputCorrect = (i, value) =>
        setQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, correctAnswer: value } : q)));

    const addOption = (qIndex) =>
        setQuestions((prev) =>
            prev.map((q, idx) =>
                idx === qIndex ? { ...q, options: [...q.options, { text: '', isCorrect: false }] } : q,
            ),
        );

    const updateOptionText = (qIndex, oIndex, value) =>
        setQuestions((prev) =>
            prev.map((q, idx) =>
                idx === qIndex
                    ? { ...q, options: q.options.map((opt, j) => (j === oIndex ? { ...opt, text: value } : opt)) }
                    : q,
            ),
        );

    const toggleOptionCorrect = (qIndex, oIndex) =>
        setQuestions((prev) =>
            prev.map((q, idx) =>
                idx === qIndex
                    ? {
                          ...q,
                          options: q.options.map((opt, j) =>
                              j === oIndex ? { ...opt, isCorrect: !opt.isCorrect } : opt,
                          ),
                      }
                    : q,
            ),
        );

    const removeOption = (qIndex, oIndex) =>
        setQuestions((prev) =>
            prev.map((q, idx) => (idx === qIndex ? { ...q, options: q.options.filter((_, j) => j !== oIndex) } : q)),
        );

    const validate = () => {
        if (!title.trim()) return alert('Quiz title cannot be empty.') || false;
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.questionText?.trim()) return alert(`Question ${i + 1} text cannot be empty.`) || false;
            if (q.type === 'checkbox') {
                if (!q.options.length) return alert(`Question ${i + 1}: must have at least one option.`) || false;
                for (let j = 0; j < q.options.length; j++)
                    if (!q.options[j].text?.trim())
                        return alert(`Question ${i + 1}, option ${j + 1} cannot be empty.`) || false;
            }
        }
        return true;
    };

    return {
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
    };
};
