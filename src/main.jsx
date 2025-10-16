import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import { AuthProvider } from '../src/components/context/AuthContext.jsx';  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);