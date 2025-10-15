import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import homeImg from '../../assets/home.svg'
import ideaImg from '../../assets/idea.svg'
import leaderImg from '../../assets/leaderboard.svg'
import aboutImg from '../../assets/about.svg'
import loginImg from '../../assets/log-in.svg'
const NavBar = ({startLoading}) => {
  const link = <>
  <li>
       <NavLink to="/" className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-yellow-600 ${isActive ? 'border-b-2 border-yellow-600' : ''}`
                }
                onClick={startLoading}>
              <img src={homeImg} alt="Home" className='w-5 h-5' />     
            Home 
      </NavLink>
  </li>
   <li>
       <NavLink to="/quiz" className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-yellow-600 ${isActive ? 'border-b-2 border-yellow-600' : ''}`
                }
                onClick={startLoading} >
                  <img src={ideaImg} alt="Home" className='w-5 h-5' />
            Quiz 
      </NavLink>
  </li>
   <li>
       <NavLink to="/leaderboard" className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-yellow-600 ${isActive ? 'border-b-2 border-yellow-600' : ''}`
                }
                onClick={startLoading} >
            <img src={leaderImg} alt="Home" className='w-5 h-5' />
            Leaderboard 
      </NavLink>
  </li>
   <li>
       <NavLink to="/about" className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-yellow-600 ${isActive ? 'border-b-2 border-yellow-600' : ''}`
                }
                onClick={startLoading} >
                   <img src={aboutImg} alt="Home" className='w-5 h-5' />
            About Us 
      </NavLink>
  </li>
     
  </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {link}
      </ul>
    </div>
    {/* Logo */} 
    <div className='mx-5'>
       <Link to="/" className='flex items-center justify-around gap-2' onClick={startLoading}>
           <img className='h-8' src={ideaImg}  />
           <h1 className='text-xl font-semibold text-yellow-600'>Quiz.IO</h1>
       </Link>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {link}
    </ul>
  </div>
  <div className="navbar-end">
    <button className='btn btn-primary rounded-xl border-none bg-gradient-to-r from-yellow-500 to-yellow-800'>
                        <img src={loginImg} alt="" className='h-5 ' />
                        Login
                    </button>
  </div>
</div>
    );
};

export default NavBar;