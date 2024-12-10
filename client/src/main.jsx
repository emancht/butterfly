import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import "./assets/css/index.css"
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
