import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ConnectedNav = ({ connected }) => {
  const [auth, setAuth] = useState(connected);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ConnectedNav;
