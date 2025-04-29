// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:7000/auth/dashboard", {
          credentials: "include",
        });
        if(!res.status){
          navigate("/login")
        }
        setIsAuth(true);
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuth === null) return <p style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>Checking authentication...</p>;
  return children;
};

export default ProtectedRoute;
