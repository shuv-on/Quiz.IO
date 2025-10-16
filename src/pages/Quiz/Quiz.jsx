import React from 'react';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';

const Quiz = () => {
    const { quiz } = useLoaderData();

    const {startLoading} = useOutletContext();
    const navigate = useNavigate();

    const handleShowAllQuiz = () => {
        startLoading();
        navigate('/quiz');
    }

    return (
        <div className='bg-[#E9E9E9] py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto p-4'>
                {quiz.map(category => (
                    <div key={category.id} className='flex flex-col items-center justify-center p-2 gap-2 bg-white rounded-xl shadow-md'>
                        <img
                            src={category.image}
                            alt={category.name}
                            className='w-full object-cover rounded-xl h-48'
                        />
                        <p className='text-xl font-semibold text-center px-2 py-4'>{category.name}</p>
                    </div>
                ))}
                <div className='col-span-full flex justify-center'>
                    <button onClick={handleShowAllQuiz} className="btn bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl">Show All Category</button>

                </div>
            </div>
        </div>
    );
};

export default Quiz;