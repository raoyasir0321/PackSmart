import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@/context/AuthProvider";

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/admin/dashboard" /> : element;
};

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
