import { Outlet, Navigate } from "react-router-dom";
import useStore from "../store";

export default function PublicLayout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return !isAuthenticated
    ? <><Outlet /></>
    : <Navigate to="/orders" replace />;
}
