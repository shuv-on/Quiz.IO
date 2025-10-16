import './App.css';
import { AuthProvider } from '../src/components/context/AuthContext.jsx'; 
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';  

function App() {
  return (
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;