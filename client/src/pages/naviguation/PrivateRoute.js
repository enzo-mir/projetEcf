import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Admin from "../Admin";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
  
  return auth ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
