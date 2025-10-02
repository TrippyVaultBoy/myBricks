import { Navigate, Outlet } from "react-router-dom";

import { useMyBricksContext } from "./components/ContextProvider";

const PrivateRoutes = () => {
    const { isLoggedIn } = useMyBricksContext();

    return (
        isLoggedIn ? <Outlet/> : <Navigate to="/login" />
    )
};

export default PrivateRoutes;