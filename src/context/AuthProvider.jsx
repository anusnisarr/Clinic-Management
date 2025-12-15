import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_PATH;

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
    refreshAccessToken();
  }, [refreshAccessToken]);

  if (loading) return null; // or a loader component

  return (
    <AuthContext.Provider value={{ accessToken, user, setAccessToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
