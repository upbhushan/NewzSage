import React, { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode"; // Install this package: npm install jwt-decode

// Create the Auth Context
const AuthContext = createContext({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});

// Custom hook to use the Auth Context
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// Auth Context Provider
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const validateToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthUser(null);
          setIsLoading(false);
          return;
        }
    
        try {
          const decodedToken = jwtDecode(token);
          if (!decodedToken.user_id) {
            throw new Error('Invalid token');
          }
    
          setAuthUser({
            id: decodedToken.user_id,
            username: decodedToken.username,
            email: decodedToken.email,
          });
        } catch (error) {
          console.error('Token validation error:', error);
          setAuthUser(null);
          localStorage.removeItem('token');
        } finally {
          setIsLoading(false);
        }
      };

      const refreshAuthUser = () => {
        setIsLoading(true);
        validateToken();
      };
    
      useEffect(() => {
        validateToken();
      }, []);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isLoading,
                setAuthUser,
                refreshAuthUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
