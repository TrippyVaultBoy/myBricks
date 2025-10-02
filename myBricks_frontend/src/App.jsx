import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PrivateRoutes from "./components/PrivateRoutes";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Login";
import CollectionPage from "./components/CollectionPage";
import AccountPage from "./components/AccountPage";
import BrowsePage from "./components/BrowsePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/collection" element={<CollectionPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>
        </Route>
        
        {/* Public Routes */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/browse" element={<BrowsePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
