import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";

function ProtectedRoute() {
    const { user } = useUser();
    const isLoggedIn = user.isLoggedIn;
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;