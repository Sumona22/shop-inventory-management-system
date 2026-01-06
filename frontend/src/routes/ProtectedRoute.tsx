import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  role: string;
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const { token, role: userRole } = useAuth();

  if (!token || userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
