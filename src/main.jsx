import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from "react-router-dom";

import './index.scss'

import { ThemeProvider } from "./contexts/ThemeContext.jsx"
import { UserProvider } from './contexts/UserContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>

)
