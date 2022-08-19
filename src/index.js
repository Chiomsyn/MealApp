import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TicketContextProvider } from './context/TicketContext';
import { AuthContextProvider } from './context/AuthContext';
import { MealContextProvider  } from './context/MealContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <MealContextProvider>
   <TicketContextProvider>
   <App />
   </TicketContextProvider>
   </MealContextProvider>
   </AuthContextProvider>
  </React.StrictMode>
);

