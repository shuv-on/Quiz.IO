import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)