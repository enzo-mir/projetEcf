import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ isAdmin }) => {

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
