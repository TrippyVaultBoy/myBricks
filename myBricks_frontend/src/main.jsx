import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MyBricksProvider } from './components/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyBricksProvider>
      <App/>
    </MyBricksProvider>
  </StrictMode>
);