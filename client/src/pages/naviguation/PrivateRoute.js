import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
  
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
