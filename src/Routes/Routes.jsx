import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/Root';
import Home from '../pages/Home/Home';
import Quiz from '../pages/Quiz/Quiz';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import About from '../pages/About/About';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import QuizQuestion from '../pages/QuizQuestion/QuizQuestion';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage />, 
        children: [
            {
                index: true,
                Component: Home,
                loader: async () => {
                    const API_URL = '/quizData.json';
                    const response = await fetch(API_URL);
                    if(!response.ok) throw new Error('Failed to fetch quiz');
                    const data = await response.json();
                    const transformedData = data.categories.map( item =>({
                       id: item.questions[0].id,
                        image: item.image,
                        name: item.name
                    }) );
                    return {quiz: transformedData};
                },
            },
            {
                path:"/quiz",
                Component: Quiz,
                loader: async () => {
                    const API_URL = '/quizData.json';
                    const response = await fetch(API_URL);
                    if(!response.ok) throw new Error('Failed to fetch quiz');
                    const data = await response.json();
                    const transformedData = data.categories.map( item =>({
                       id: item.questions[0].id,
                        image: item.image,
                        name: item.name
                    }) );
                    return {quiz: transformedData};
                },
               
            },
             {
                    path:"/quiz/:id",
                    Component: QuizQuestion,
                },
            {
                path:"/leaderboard",
                Component:Leaderboard, 
            },
            {
                path:"/about",
                Component:About,
            }
        ],

    }
]);