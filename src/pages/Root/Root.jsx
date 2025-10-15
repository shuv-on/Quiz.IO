import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <main>
                <Outlet/>
            </main>
            <div>
                <Footer></Footer>
            </div>
            
        </div>
    );
};

export default Root;