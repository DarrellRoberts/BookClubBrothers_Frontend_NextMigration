"use client"

import { useState, useEffect, createContext, ReactNode } from "react";

interface AuthContextValue {
    token: string;
    login: (string) => void;
    logout: () => void;
    children?: ReactNode | undefined; 
  }

  const defaultValue: AuthContextValue = {
    token: '',
    login: () => {},
    logout: () => {},
    children: undefined
  };

export const AuthContext = createContext(defaultValue);

const AuthContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider