import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedUserRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedUserRoutes;
