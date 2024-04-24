import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {ContextProvider} from './contexts/ContextProvider.jsx'
import {AuthProvider} from './contexts/AuthProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthProvider>
    <ContextProvider>
      <Routes>
        <Route path='/*' element={ <App />}/>
      </Routes>
   
    </ContextProvider>
    </AuthProvider>
    </BrowserRouter>
)
