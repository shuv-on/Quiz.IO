import React from 'react';

const QuizQuestion = () => {
    const currentQuestion = {
        question: "What's your name?",
        options: ["Alice", "Bob", "Charlie", "David"]
    };

    return (
        <div className='bg-[#E9E9E9] p-4 min-h-screen'>
            <div className='max-w-[480px] mx-auto bg-white p-6 rounded-xl shadow-md'>
                <span className='text-xl font-semibold text-gray-800 block mb-4'>
                    1) {currentQuestion.question}
                </span>
                
                <div className='grid grid-cols-1 gap-4 py-2'> 
                    {currentQuestion.options.map((optionText, index) => (
                        <div 
                            key={index} 
                            className='border-2 border-gray-300 rounded-lg p-3 flex items-center cursor-pointer hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500' // স্টাইল পরিবর্তন
                        >
                           
                            <span 
                                className='w-7 h-7 flex items-center justify-center 
                                           rounded-full bg-blue-500 text-white font-bold 
                                           text-sm mr-3' 
                            >
                                {String.fromCharCode(65 + index)} 
                            </span>
                            
                          
                            <span className='text-gray-800 text-lg'>
                                {optionText}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizQuestion;