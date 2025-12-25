import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import './index.css'
import AppWrapper from './appWraper.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
<BrowserRouter>
<AuthProvider>
    <AppWrapper />
</AuthProvider>
</BrowserRouter>
  // </StrictMode>,
)
