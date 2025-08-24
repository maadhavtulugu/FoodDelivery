import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userRole = decoded.role; 
      if (requiredRole && userRole !== requiredRole) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      navigate("/login"); 
    }
  }, [navigate, requiredRole]);

  return children;
};

export default ProtectedRoute;
