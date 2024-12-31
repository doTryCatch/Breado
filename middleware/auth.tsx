import React, { useContext, createContext, useState, useEffect } from "react";
import { API } from "../config";
import axios from "axios";
interface User {
  name: string;
  user_id: number;
  phone: number;
  role: string;
}
const AuthContext = createContext<{
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  loadUserData: (userData: User) => void;
  user: { name: string; user_id: number; phone: number; role: string } | any;
} | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setLoginIn] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProfile = async () => {
      try {
        const user = await axios.get(API.getProfile, {
          withCredentials: true,
          signal,
        });
        console.log(user.data);
        const { id, username, phone, role } = user.data;
        setUser({ user_id: id, phone: phone, name: username, role: role });
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
  const loadUserData = (userData: any) => setUser(userData);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, user, loadUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
