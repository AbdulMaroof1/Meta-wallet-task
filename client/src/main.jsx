// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import this FIRST
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
