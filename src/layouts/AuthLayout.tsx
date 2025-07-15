import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";
export default function AuthLayout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return isAuthenticated 
  ? <><Outlet /> </> 
  : <Navigate to="/login" replace />;
}
