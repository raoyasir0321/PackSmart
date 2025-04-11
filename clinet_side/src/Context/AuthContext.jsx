import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "../../src/api/queries/useUser";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading: iseGetting, isError: error } = useGetUser();

  return (
    <AuthContext.Provider value={{ user, iseGetting, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
