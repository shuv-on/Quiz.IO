import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/context/AuthContext';

const Leaderboard = () => {
    const { user, openModal } = useAuth();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setLoading(false); 
            return;
        }

        const fetchScores = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8081/api/scores/leaderboard');  // Backend API
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard data. Please try again later.');
                }
                const data = await response.json();
                setScores(data.slice(0, 10));  // Top 10
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [user]); 

    useEffect(() => {
        if (!user && !loading) {
            openModal();
        }
    }, [user, loading, openModal]);
    
    if (!user) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 p-4'>
                <div className='text-center bg-white p-10 rounded-xl shadow-lg max-w-md mx-auto'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-4'>Access Denied</h2>
                    <p className='text-gray-600 text-lg mb-6'>You need to be logged in to view the leaderboard.</p>
                    <button onClick={openModal} className='btn btn-primary bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-2 px-6 text-lg rounded-lg'>
                        Login Now
                    </button>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return <div className="text-center py-20">Loading Dashboard...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    return (
        <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
                
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead className="bg-yellow-500 text-white">
                            <tr>
                                <th className="py-4 px-6 text-lg font-semibold">Rank</th>
                                <th className="py-4 px-6 text-lg font-semibold">Player</th>
                                <th className="py-4 px-6 text-lg font-semibold">Category</th>
                                <th className="py-4 px-6 text-lg font-semibold">Score</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {scores.length > 0 ? (
                                scores.map((entry, index) => (
                                    <tr key={entry.id} className="hover:bg-gray-100 transition">
                                        <td className="py-4 px-6 font-bold text-lg text-gray-700">{index + 1}</td>
                                        <td className="py-4 px-6 text-md text-gray-600">{entry.username}</td>
                                        <td className="py-4 px-6 text-md text-gray-600">{entry.category}</td>
                                        <td className="py-4 px-6 text-md font-semibold text-gray-800">{entry.score} / {entry.totalQuestions}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">No scores available yet. Be the first one to play!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;