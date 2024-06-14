import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function PrivateRoutes() {
  const { authData } = useContext(AuthContext);

  return authData ? <Outlet /> : <Navigate to="/" />;
}
