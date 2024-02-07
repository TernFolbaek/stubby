import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.css';
import App from './App';

console.log('React version:', React.version);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


