import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        const userInfo = jwtDecode(token);
        setUser(userInfo);
        setAuthLoading(false);
      }
    }
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
