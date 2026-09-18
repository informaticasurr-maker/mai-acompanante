import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LegajosProvider } from './context/LegajosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegajosProvider>
      <App />
    </LegajosProvider>
  </StrictMode>,
)
