import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // only if App is used inside your router
import { RouterProvider } from 'react-router-dom'; // fix this too
import router from './Routes/Routes'; // ✅ make sure this path is correct
import AuthProvider from './Contexts/AuthProvider.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  
  </StrictMode>
);
