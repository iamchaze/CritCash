import React, { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";

export const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverReady, setServerReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const intervalRef = useRef(null);
  const delayTimerRef = useRef(null);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/health`
        );

        if (response.data.status === "OK") {
          setServerReady(true);
          setChecking(false);
          setShowPopup(false);

          clearInterval(intervalRef.current);
          clearTimeout(delayTimerRef.current);
        }
      } catch (error) {
        setServerReady(false);
      }
    };

    
    delayTimerRef.current = setTimeout(() => {
      if (!serverReady) {
        setShowPopup(true);
      }
    }, 10000);

    checkServerHealth();
    intervalRef.current = setInterval(checkServerHealth, 5000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(delayTimerRef.current);
    };
  }, []);

  return (
    <ServerStatusContext.Provider value={{ serverReady, checking, showPopup }}>
      {children}
    </ServerStatusContext.Provider>
  );
};