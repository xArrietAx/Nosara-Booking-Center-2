"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const pathname = usePathname(); 

  const [history, setHistory] = useState([pathname]); 

  const [previousRoute, setPreviousRoute] = useState(''); 

  const reset = () => {
    setHistory([pathname]); 
    setPreviousRoute(null);
  };

  useEffect(() => {
    if (pathname) {
      setHistory((prev) => {
        if (prev[prev.length - 1] !== pathname) {
          return [...prev, pathname];
        }
        return prev;
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (history.length > 0) {
      setPreviousRoute(history[history.length - 1]); 
    } else {
      setPreviousRoute('');
    }
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, previousRoute, reset, pathname }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory debe ser usado dentro de un HistoryProvider");
  }

  return context;
};

export { useHistory, HistoryProvider };