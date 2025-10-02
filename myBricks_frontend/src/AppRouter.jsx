import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes.jsx";

import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import CollectionPage from "./components/CollectionPage.jsx";
import AccountPage from "./components/AccountPage.jsx";
import BrowsePage from "./components/BrowsePage.jsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;