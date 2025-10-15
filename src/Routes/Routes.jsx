import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/Root';
import Home from '../pages/Home/Home';
import Quiz from '../pages/Quiz/Quiz';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Footer from '../pages/Footer/Footer';
import About from '../pages/About/About';


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path:"/quiz",
                Component: Quiz,
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