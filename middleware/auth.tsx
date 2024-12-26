import React, { useContext, createContext, useState, useEffect } from "react";

import axios from "axios";
const AuthContext = createContext<{
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
} | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setLoginIn] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProfile = async () => {
      try {
        const user = await axios.get(
          "https://d495-103-232-154-95.ngrok-free.app/auth/getProfile",
          {
            withCredentials: true,
            signal,
          },
        );
        console.log(user);
        setLoginIn(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request canceled:", error.message);
        } else {
          console.log("Error:", error);
        }
      }
    };
    fetchProfile();
    return () => {
      controller.abort();
    };
  }, []);
  const logIn = () => setLoginIn(true);
  const logOut = () => setLoginIn(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
