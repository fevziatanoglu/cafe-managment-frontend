import {  Navigate, Outlet } from "react-router-dom";
import useStore from "../store";
export default function AdminLayout() {
  const { isAuthenticated, user } = useStore();
  return isAuthenticated && user?.role === "admin"
    ? <Outlet />
    : <Navigate to="/orders" replace />;
}
