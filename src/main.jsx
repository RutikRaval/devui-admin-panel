import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Router from './routes/Routes.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router />
   <Toaster />
  </StrictMode>,
)
