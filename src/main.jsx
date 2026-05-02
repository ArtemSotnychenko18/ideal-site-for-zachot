import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Якщо є
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

// УВАГА: Перевір, щоб тут було написано 'contex' (як твоя папка)
import { CartProvider } from './contex/CartContext'; 
import { AuthProvider } from './contex/AuthContext'; // <--- ОСЬ ЦЕ МИ ДОДАЛИ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* AuthProvider має бути найвищим, щоб передавати дані і в Кошик, і в Додаток */}
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)