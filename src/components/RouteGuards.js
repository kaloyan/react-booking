import { Navigate, Outlet } from "react-router-dom";
import { storageTool } from "../utils/helpers";

export const AdminGuard = () => {
  const role = storageTool.get("role");

  if (role !== "admin") {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};

export const RegisteredGuard = () => {
  const role = storageTool.get("role");

  if (!role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
