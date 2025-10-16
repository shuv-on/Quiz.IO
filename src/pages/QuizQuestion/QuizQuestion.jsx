import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';  

const QuizQuestion = () => {
    const { category } = useLoaderData();
    const navigate = useNavigate();
    const { user } = useAuth(); 
    
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [quizFinished, setQuizFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);  // Submit loading

    // Timer effect (no change)
    useEffect(() => {
        if (quizFinished) return;
        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval);
                    handleSubmit(); // Auto-submit
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [quizFinished]);

    if (!category || !category.questions || category.questions.length === 0) {
        return <div className="text-center text-red-500 text-2xl p-10">Quiz not found or no questions available.</div>;
    }

    const questions = category.questions;

    // Handle selecting an option (no change)
    const handleOptionSelect = (questionIndex, optionIndex) => {
        if (quizFinished) return;
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: optionIndex
        }));
    };

    // Handle quiz submission (updated with POST)
    const handleSubmit = async () => {
        if (quizFinished) return;
        setSubmitLoading(true);

        let finalScore = 0;
        questions.forEach((question, index) => {
            const selectedOptionIndex = selectedAnswers[index];
            if (selectedOptionIndex !== undefined) {
                if (question.options[selectedOptionIndex] === question.answer) {
                    finalScore++;
                }
            }
        });
        
        setScore(finalScore);
        setQuizFinished(true);
        setSubmitLoading(false);

       
        if (user) {
            try {
                const totalQuestions = questions.length;
                const scoreData = {
                    userId: user.id || 1, 
                    username: user.username,
                    category: category.name,
                    score: finalScore,
                    totalQuestions: totalQuestions
                };
                const response = await fetch('http://localhost:8081/api/scores/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scoreData),
                });
                if (response.ok) {
                    console.log('Score saved!');
                } else {
                    console.error('Failed to save score');
                }
            } catch (err) {
                console.error('Error saving score:', err);
            }
        }
    };

   
    const handlePlayAgain = () => {
        setSelectedAnswers({});
        setScore(0);
        setTimeLeft(300);
        setQuizFinished(false);
    };
    
   
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    
    const correctAnswersCount = score;
    const incorrectAnswersCount = Object.keys(selectedAnswers).length - score;

    return (
        <div className='bg-[#E9E9E9] py-8 px-4 min-h-screen'>
            <div className='max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md'>
                
                <div className='flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-6 gap-4'>
                    <h1 className='text-3xl font-bold text-gray-800 text-center'>{category.name} Quiz</h1>
                    
                    {!quizFinished ? (
                        <div className='text-2xl font-bold text-red-500 bg-red-100 px-4 py-2 rounded-lg'>
                            Time Left: {formatTime(timeLeft)}
                        </div>
                    ) : (
                        <div className='text-center bg-blue-100 p-3 rounded-lg'>
                            <h2 className='text-xl font-bold text-blue-800'>Result</h2>
                            <div className='flex gap-4 justify-center'>
                                <p className='text-lg'><span className='font-bold text-green-600'>Correct:</span> {correctAnswersCount}</p>
                                <p className='text-lg'><span className='font-bold text-red-600'>Incorrect:</span> {incorrectAnswersCount}</p>
                            </div>
                        </div>
                    )}
                </div>

              
                <div className='space-y-8'>
                    {questions.map((q, questionIndex) => (
                        <div key={q.id || questionIndex}>
                            <p className='text-xl font-semibold text-gray-800 mb-4'>
                                {questionIndex + 1}) {q.question}
                            </p>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {q.options.map((option, optionIndex) => {
                                    let optionStyling = 'border-gray-300 hover:bg-gray-100';
                                    let spanStyling = 'bg-gray-300';
                                    let spanTextStyling = 'text-gray-800';

                                    if (quizFinished) {
                                        const isCorrectAnswer = q.options.indexOf(q.answer) === optionIndex;
                                        const isSelectedAnswer = selectedAnswers[questionIndex] === optionIndex;

                                        if (isCorrectAnswer) {
                                            optionStyling = 'bg-green-100 border-green-500 font-semibold';
                                            spanStyling = 'bg-green-500';
                                            spanTextStyling = 'text-white';
                                        } else if (isSelectedAnswer) {
                                            optionStyling = 'bg-red-100 border-red-500 font-semibold';
                                            spanStyling = 'bg-red-500';
                                            spanTextStyling = 'text-white';
                                        } else {
                                            optionStyling = 'bg-gray-50 border-gray-200 text-gray-500';
                                        }
                                    } else if (selectedAnswers[questionIndex] === optionIndex) {
                                        optionStyling = 'border-blue-500 bg-blue-100 ring-2 ring-blue-400';
                                        spanStyling = 'bg-blue-500';
                                        spanTextStyling = 'text-white';
                                    }
                                    
                                    return (
                                        <div
                                            key={optionIndex}
                                            onClick={() => handleOptionSelect(questionIndex, optionIndex)}
                                            className={`rounded-lg p-3 flex items-center transition-all border-2 ${quizFinished ? 'cursor-default' : 'cursor-pointer'} ${optionStyling}`}
                                        >
                                            <span className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-sm mr-3 ${spanStyling} ${spanTextStyling}`}>
                                                {String.fromCharCode(65 + optionIndex)}
                                            </span>
                                            <span className='text-md'>{option}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                
                
                <div className="mt-10 text-center">
                    {!quizFinished ? (
                        <button
                            onClick={handleSubmit}
                            disabled={submitLoading}
                            className="bg-green-600 text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {submitLoading ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                             <button
                                onClick={handlePlayAgain}
                                className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-blue-700 transition cursor-pointer"
                            >
                                Play Again
                            </button>
                             <button
                                onClick={() => navigate('/quiz')}
                                className="bg-gray-600 text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-gray-700 transition cursor-pointer"
                            >
                                Choose Another Category
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizQuestion;