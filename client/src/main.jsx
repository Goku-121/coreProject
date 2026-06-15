import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'


const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['token'] = token;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)