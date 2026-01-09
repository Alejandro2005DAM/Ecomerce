import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PayPalScriptProvider
    options={{
      clientId: 'AT7y8W34H2GQ7Hh2Wac-ff81e9dP5NhZlLa4PTBGJzmprbuXYa-y7NVaqJa6MlUdEp-pPfQ4b0xjWPDc'
    }}>
      <App />
    </PayPalScriptProvider>
  </StrictMode>,
)
