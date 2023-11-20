import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import "./styles/fonts.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);


