import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <main>
                <Outlet/>
            </main>
            
        </div>
    );
};

export default Root;