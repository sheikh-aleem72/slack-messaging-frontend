import { QueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const queryClient = new QueryClient();

  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));

    if (user && token) {
      setAuth({
        user: user,
        token,
        isLoading: false,
      });
    } else {
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  }, []);

  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.invalidateQueries("fetchWorkspace");

    setAuth({
      user: null,
      token: null,
      isLoading: false,
    });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
