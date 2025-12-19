import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";

export const AuthContext = createContext();
const location = useLocation();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_PATH;
  const PUBLIC_ROUTES = ["/login", "/signup"];

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      console.log("response", res)
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (err) {    
      navigate("/login", { replace: true });
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, navigate]);
  
  useEffect(() => {
    const isPublicRoute =
      location.pathname === "/login" ||
      location.pathname === "/signup";

    if (isPublicRoute) {
      setLoading(false);
      return;
    }

    refreshAccessToken();
  }, [location.pathname, refreshAccessToken]);

  if (loading) return null; // or a loader component

  return (
    <AuthContext.Provider value={{ accessToken, user, setAccessToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
