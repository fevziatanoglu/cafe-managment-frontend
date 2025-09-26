import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";
import { useOrderSocket } from "../store/slices/useOrderSocket";

export default function AuthLayout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const adminId = useStore((state) => state.user?.adminId || state.user?._id);
  useOrderSocket(adminId);

  return isAuthenticated 
    ? <><Outlet /></>
    : <Navigate to="/login" replace />;
}
