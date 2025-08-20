import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { state } = useAuth();

  if (state.state !== "SIGNED_IN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
