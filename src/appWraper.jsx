import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setNavigate } from "./utils/navigation";
import App from "./App";

const AppWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);  // Set global navigate for utils/interceptors
  }, [navigate]);

  return <App />;           // Render your main app (routes, layout)
};

export default AppWrapper;
