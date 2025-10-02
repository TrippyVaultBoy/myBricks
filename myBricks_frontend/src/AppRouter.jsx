import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes.jsx";

import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import CollectionPage from "./CollectionPage.jsx";
import AccountPage from "./AccountPage.jsx";
import BrowsePage from "./BrowsePage.jsx";

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