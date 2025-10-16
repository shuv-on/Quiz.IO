import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ideaImg from '../../assets/idea.svg'

const Root = () => {
    const location= useLocation();
    const [loading, setLoading] = useState(true);
    const loadingTimeRef = useRef(null);
    const showFooter = ['/', '/quiz', '/leaderboard', '/about'].includes(location.pathname)

useEffect(() => {
        const initialTimer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(initialTimer);
    }, []);

    //start loading
    const startLoading = () => {
        setLoading(true);
        if (loadingTimeRef.current) {
            clearTimeout(loadingTimeRef.current);
        }
        loadingTimeRef.current = setTimeout(() => {
            setLoading(false);
            loadingTimeRef.current = null;
        }, 1000);

    };

    return (
        <div>
            <div>
                <NavBar startLoading={startLoading}></NavBar>
            </div>
            <main>
                <Outlet context={{startLoading}}/>
            </main>
            <div>
                {showFooter && <Footer startLoading={startLoading}></Footer>} 
            </div>
            {loading && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-100/75 backdrop-blur-sm z-50'>
                    <div className="flex items-center ">
                   
                    <img
                        src={ideaImg}
                        
                        className="h-25 animate-ping" 
                    />
                    
                    
                   </div>
                </div>
                
            )}
            
        </div>
    );
};

export default Root;