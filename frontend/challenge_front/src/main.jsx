import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SessionContextProvider from './context/SessionContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <SessionContextProvider>
        <App />
    </SessionContextProvider>
)
