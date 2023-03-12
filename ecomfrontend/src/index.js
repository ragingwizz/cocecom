import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import AppRoutes from './Routes';

console.log("I am inside index.js")
const root = ReactDOM.createRoot(document.getElementById('root'));        
root.render(<AppRoutes />);
