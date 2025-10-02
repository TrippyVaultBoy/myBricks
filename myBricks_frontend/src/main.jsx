import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import { MyBricksProvider } from './components/ContextProvider.jsx';
import AppRouter from './AppRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <MyBricksProvider>
        <AppRouter />
      </MyBricksProvider>
    </Router>
  </StrictMode>
);